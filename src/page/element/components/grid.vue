<template>
	<div class="pos-rel">
		<i class="el-icon-setting pos-abs" @click="dialogVisible = true"/>
		<el-table
			:id="id"
			:data="data"
			ref="setColTable"
			border
			show-summary
			style="width: 100%"
			:class="className">
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
			width="30%"
			:before-close="handleClose">
			<el-checkbox-group v-model="columnCheck">
				<el-checkbox v-for="(item,index) in getColumnCheckBox"
					:key="index"
					:label="item.prop">{{item.label}}</el-checkbox>
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
    }
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
		data: Array,
		cols: Array,
		id: String,
		className: String
	},
	computed: {
		getColumnCheckBox() {
			let checkArray = []
			this.cols.map(item => {
				checkArray.push({
					prop: item.prop,
					label: item.label,
				})
			})
			return checkArray
		},
	},
	data() {
		return {
			dialogVisible: false,
			columnCheck: [],
			getColumn: [],
			textVal: undefined,
		}
	},
	methods: {
		handleClose () {
			this.dialogVisible = false
		},
		saveSettingCol() {
			localStorage.setItem(this.$refs.setColTable.$attrs.id, this.columnCheck.join(','))
			this.dialogVisible = false;
			this.getColumn = this.getColumnFun();
			this.$refs.setColTable.doLayout();
		},
		getColumnFun() {
			let cols = [];
			if (this.$refs.setColTable) {	
				let keys = localStorage.getItem(this.$refs.setColTable.$attrs.id);
				cols = [...this.cols]
				if (keys) {
					this.columnCheck = keys.split(',').map(item => {
						cols = cols.filter(item2 => item2.prop !== item);
						return item;
					})
				}
			}
			return cols;
		}
	},
	mounted () {
		this.getColumn = this.getColumnFun();
	}
}
</script>
<style lang="scss" scoped>
.pos-rel {
	position: relative;
	.pos-abs {
		position: absolute;
		&.el-icon-setting {
			z-index: 99;
			left: 20px;
			top: 20px;
			cursor: pointer;
			&:hover {
				color: #409EFF;
			}
		}
	}
}
</style>