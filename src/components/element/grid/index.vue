<template>
	<div class="set-col-grid pos-rel" :loading="tableLoading">
		<i class="el-icon-setting pos-abs" :class="{'new-pos': selectionCol}" @click="showDialog"/>
		<el-table
			:id="id"
			:data="data"
			ref="setColTable"
			border
			:show-summary="showSummary"
			style="width: 100%;height:100%"
			:row-class-name="rowClassName"
			@row-click="handleRowClick"
			@selection-change="handleSelectionChange"
			:class="className">
			<el-table-column
				v-if="selectionCol"
				type="selection"
				width="70"/>
			<el-table-column v-for="(col,index) in getColumn"
			 :key="index"
			 :prop="col.prop"
			 :label="col.label"
			 :sortable="col.sortable || false"
			 :width="col.width"
			 :align="col.align || 'left'"
			 :fixed="col.fixed || false">
				<template slot-scope="{row,$index}">
					<render-template
						v-if="col.render" 
						:row="row"
						:render="col.render"
						:index="$index"
						:column="col"/>
					<template v-else-if="col.formatter">
						{{col.formatter(row[col.prop])}}
					</template>
					<template v-else>
						{{row[col.prop]}}
					</template>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			title="编辑列"
			:visible.sync="dialogVisible"
			v-if="dialogVisible"
			width="600px"
			:before-close="handleClose">
			<div class="dis-flex">
				<div class="flex-1">
					<h3 class="mg-b-10">显示列</h3>
					<el-checkbox-group v-model="columnCheck.show">
						<div v-for="(item,index) in columnCheckBox.show"
							:key="index"
							class="mg-b-10 dis-flex align-c">
							<el-checkbox
								class="flex-2"
								:label="item.prop">{{item.label}}</el-checkbox>
							<div class="flex-1" v-if="!item.lock">
								<el-button type="mini" v-if="index !== cols.filter(item => item.fixed === 'left').length" @click="moveTo('show', index, index - 1)">上移</el-button>
							</div>
							<div class="flex-1" v-if="!item.lock">
								<el-button type="mini" v-if="index !== cols.filter(item => item.fixed !== 'right').length - 1" @click="moveTo('show',index, index + 1)">下移</el-button>
							</div>
						</div>
					</el-checkbox-group>
				</div>
				<div class="flex-1">
					<h3 class="mg-b-10">导出列</h3>
					<el-checkbox-group v-model="columnCheck.exports">
						<div v-for="(item,index) in columnCheckBox.exports"
							:key="index"
							class="mg-b-10 dis-flex align-c">
							<el-checkbox
								class="flex-2"
								:label="item.prop">{{item.label}}</el-checkbox>
							<div class="flex-1" v-if="!item.lock">
								<el-button type="mini" v-if="index !== cols.filter(item => item.fixed === 'left').length" @click="moveTo('exports', index, index - 1)">上移</el-button>
							</div>
							<div class="flex-1" v-if="!item.lock">
								<el-button type="mini" v-if="index !== cols.filter(item => item.fixed !== 'right').length - 1" @click="moveTo('exports', index, index + 1)">下移</el-button>
							</div>
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveSettingCol">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
const renderTemplate = {
	functional: true,
	props: {
		row: Object,
		index: Number,
		render: Function,
		column: {
      type: Object,
      default: null
		},
	},
	render: (h, data) => {
		const params = {
      row: data.props.row,
      index: data.props.index
		}
    if (data.props.column) {
			params.column = data.props.column
      return data.props.render(h, params)
    }
	}
}
// 可配置 显示列与列顺序的 表格组件
// 目前 配置保存在 客户浏览器端,
// 请保证每一个表格的 id 唯一
export default {
	name: 'grid',
	components: { renderTemplate },
	props: {
		data: Array, //数据源
		cols: Array, //配置列
		id: String,	//保持整项目唯一，用于保存表格设置的key
		className: String, // 外部 css 样式， summary-top 已设定 合计栏移至第一行
		showSummary: Boolean, // 是否显示合计栏
		value: Array,
		selectionCol: { // 是否开启选择列
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			dialogVisible: false,
			columnCheck:{
				show: [],
				exports: [],
			},
			columnExportCheck: [],
			getColumn: [],
			textVal: undefined,
			columnCheckBox: {
				show: [],
				exports: [],
			},
			tableLoading: true
		}
	},
	methods: {
		handleClose () {
			this.dialogVisible = false
		},
		saveSettingCol() {
			let listShowCol = []
			let listExportCol = []
			let show = this.columnCheck.show
			let exports = this.columnCheck.exports
			this.columnCheckBox.show.forEach((item,index) => { // 整理显示列配置
				listShowCol.push({
					prop: item.prop,
					show: !show.some(item2 => item2 === item.prop), // 不显示值为true
					sort: index,
				})
			})
			this.columnCheckBox.exports.forEach((item,index) => { // 整理导出列配置
				listExportCol.push({
					prop: item.prop,
					show: !exports.some(item2 => item2 === item.prop), // 不导出值为true
					sort: index,
				})
			})
			localStorage.setItem(this.$refs.setColTable.$attrs.id, JSON.stringify({listShowCol,listExportCol}))
			this.dialogVisible = false;
			this.getColumn = this.getColumnFun();
			this.$refs.setColTable.doLayout();
		},
		getColumnFun() {
			let cols = [];
			if (this.$refs.setColTable) {	 // 读取列配置
				let keys = JSON.parse(localStorage.getItem(this.$refs.setColTable.$attrs.id) || null);
				cols = [...this.cols]
				if (keys) {
					this.columnCheck.show = keys.listShowCol.map(item => { // 合并列与配置，并返回已勾选的列
						cols.forEach(item2 => { 
							if(item2.prop === item.prop) {
								Object.assign(item2,item);
							}
						})
						if(!item.show) {
							return item.prop;
						}
					})
					cols = cols.filter(item => !item.show).sort((a,b) => { //过滤掉不显示的列，列排序
						return a.sort - b.sort
					}) 
				} else {
					this.columnCheck.show = cols.map(item => item.prop)
					cols.forEach((item, index) => {
						item['sort'] = index;
					})
				}
			}
			return cols;
		},
		showDialog() {
			this.dialogVisible = true;
			this.columnCheckBox.show.length = 0;
			this.columnCheckBox.exports.length = 0;
			let listExportCol = JSON.parse(localStorage.getItem(this.$refs.setColTable.$attrs.id) || "{}").listExportCol || []
			this.cols.forEach(item => {
				let sort = item.sort;
				let lock = false;
				if(item.prop !== 'operation') {// 除去操作列
					if(item.fixed) { // 如果有固定列，那在配置页面就体现出来
						sort = item.fixed === 'right' ? 999 : 0
						lock = true;
					}
					this.columnCheckBox.show.push({
						prop: item.prop,
						label: item.label,
						sort,
						lock,
					})
					if(!listExportCol.length){
						this.columnCheck.exports.push(item.prop)
						this.columnCheckBox.exports.push({
							prop: item.prop,
							label: item.label,
							sort,
						})
					}
				}
			})
			if(listExportCol.length) {
				let cols = this.cols
				this.columnCheckBox.exports = listExportCol.map(item => {
					if(!item.show) {
						this.columnCheck.exports.push(item.prop)
					}
					return {
						...item,
						label: cols.filter(item2 => item.prop === item2.prop)[0].label
					}
				})
			}
			this.columnCheckBox.show.sort((a,b) => {return a.sort - b.sort})
			this.columnCheckBox.exports.sort((a,b) => {return a.sort - b.sort})
		},
		moveTo(type,index, to) {
			let list = this.columnCheckBox[type];
			let item = list[index];
			this.$set(this.columnCheckBox[type], index, list[to]);
			this.$set(this.columnCheckBox[type], to, item);
		},
		handleSelectionChange(val) {
			this.$emit('input', val)
		},
    //点击行触发，选中或不选中复选框
   	handleRowClick(row, column, event) {
			this.$refs.setColTable.toggleRowSelection(row);
		},
		rowClassName({row, rowIndex}) {
			if(this.value && this.value.includes(row)) {
				return 'select-row'
			}
		}
	},
	mounted () {
		this.getColumn = this.getColumnFun();
	}
}
</script>
<style lang="scss">
.set-col-grid{
	&.pos-rel {
		.pos-abs {
			&.el-icon-setting {
				z-index: 99;
				left: 20px;
				top: 19px;
				cursor: pointer;
				&:hover {
					color: $--color-primary;
				}
			}
			&.new-pos{
				left: 40px;
			}
		}
	}
}
</style>