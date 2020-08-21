<template>
	<div class="pos-rel">
		<i class="el-icon-setting pos-abs" :class="{'new-pos': selectionCol}" @click="showDialog"/>
		<el-table
			:id="id"
			:data="data"
			ref="setColTable"
			border
			:show-summary="showSummary"
			style="width: 100%"
			@selection-change="handleSelectionChange"
			:class="className">
			<el-table-column
				v-show="selectionCol"
				type="selection"
				width="70"/>
			<el-table-column v-for="(col,index) in getColumn"
			 :key="index"
			 :prop="col.prop"
			 :label="col.label"
			 :sortable="col.sortable || false"
			 :width="col.width"
			 :align="col.align || 'left'"
			 :fixed="col.fixed || ''">
				<template slot-scope="{row,$index}">
					<render-template
						v-if="col.render" 
						:row="row"
						:render="col.render"
						:index="$index"
						:column="col"/>
						<template v-else>
							{{row[col.prop]}}
						</template>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			title="编辑显示列"
			:visible.sync="dialogVisible"
			v-if="dialogVisible"
			width="300px"
			:before-close="handleClose">
			<el-checkbox-group v-model="columnCheck">
				<div v-for="(item,index) in columnCheckBox"
					:key="index"
					class="mg-b-10 dis-flex align-c">
					<el-checkbox
						class="flex-2"
						:label="item.prop">{{item.label}}</el-checkbox>
					<div class="flex-1" v-if="!item.lock">
						<el-button type="mini" v-if="index !== cols.filter(item => item.fixed === 'left').length" @click="moveTo(index, index - 1)">上移</el-button>
					</div>
					<div class="flex-1" v-if="!item.lock">
						<el-button type="mini" v-if="index !== cols.filter(item => item.fixed !== 'right').length - 1" @click="moveTo(index, index + 1)">下移</el-button>
					</div>
				</div>
			</el-checkbox-group>
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
export default {
	name: 'grid',
	components: { renderTemplate },
	props: {
		data: Array, //数据源
		cols: Array, //配置列
		id: String,	//保持整项目唯一，用于保存表格设置的key
		className: String, // 外部 css 样式， summary-top 已设定 合计栏移至第一行
		showSummary: Boolean, // 是否显示合计栏
		value: { // 行选择赋值
			default: undefined,
		},
		selectionCol: { // 是否开启选择列
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			dialogVisible: false,
			columnCheck: [],
			getColumn: [],
			textVal: undefined,
			columnCheckBox: [],
		}
	},
	methods: {
		handleClose () {
			this.dialogVisible = false
		},
		saveSettingCol() {
			let listCol = []
			let columnCheck = this.columnCheck
			this.columnCheckBox.forEach((item,index) => { // 整理列配置
				listCol.push({
					prop: item.prop,
					show: !columnCheck.some(item2 => item2 === item.prop), // 不显示值为true
					sort: index,
				})
			})
			localStorage.setItem(this.$refs.setColTable.$attrs.id, JSON.stringify(listCol))
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
					this.columnCheck = keys.map(item => { // 合并列与配置，并返回已勾选的列
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
					this.columnCheck = cols.map(item => item.prop)
					cols.forEach((item, index) => {
						item['sort'] = index;
					})
				}
			}
			return cols;
		},
		showDialog() {
			this.dialogVisible = true;
			this.columnCheckBox.length = 0;
			this.cols.forEach(item => {
				let sort = item.sort;
				let lock = false;
				if(item.fixed) { // 如果有固定列，那在配置页面就体现出来
					sort = item.fixed === 'right' ? 999 : 0
					lock = true;
				}
				this.columnCheckBox.push({
					prop: item.prop,
					label: item.label,
					sort,
					lock,
				})
			})
			this.columnCheckBox.sort((a,b) => {return a.sort - b.sort})
		},
		moveTo(index, to) {
			let list = this.columnCheckBox;
			let item = list[index];
			this.$set(this.columnCheckBox, index, list[to]);
			this.$set(this.columnCheckBox, to, item);
		},
		handleSelectionChange(val) {
			this.$emit('input', val)
		}
	},
	mounted () {
		this.getColumn = this.getColumnFun();
	}
}
</script>
<style lang="scss" scoped>
.pos-rel {
	.pos-abs {
		&.el-icon-setting {
			z-index: 99;
			left: 20px;
			top: 20px;
			cursor: pointer;
			&:hover {
				color: #409EFF;
			}
		}
		&.new-pos{
			left: 40px;
		}
	}
}
</style>