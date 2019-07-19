<template>
  <el-table
    ref="refElTable"
    :data="tableData"
    border fit highlight-current-row stripe
    :row-style="showRow"
    v-bind="$attrs"
    v-on="$listeners"
    :height=height
    @row-click="rowClick"
    :min-height=minHeight
    :span-method=spanMethod
    :reserve-selection="reserveSelection"
    :row-key="rowKey"
  >
    <el-table-column
      :reserve-selection="reserveSelection"
      label="序号"
      type="index"
      width="60" align="center">
    </el-table-column>
    <slot name="selection"/>
    <slot name="slot-column"/>
    <el-table-column
      v-for="item in columns"
      :label="item.text"
      :key="item.value"
      :min-width="item.minWidth"
      :width="item.width"
      :align="item.align||'center'"
      :header-align="item.headerAlign"
      :show-overflow-tooltip="item.showOverflowTooltip"
      :class-name="item.className"
    >
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.value">
          <template v-if="item.expand">
            <!--<span v-if="scope.row.parentId==-1" :style="{'padding-left':+'0'}"/>-->
            <span :style="{'padding-left':+scope.row.tree_level*indent-18 + 'px'} "/>
            <span v-if="!(scope.row.ifLastLevel == 1||scope.row.type == 'menu')"
              v-show="showSperadIcon(scope.row)"
              class="tree-ctrl"
              @click="toggleExpanded(scope.$index)"
            >
              <!--<i v-if="!scope.row.tree_expand" class="el-icon-plus"/>-->
              <!--<i v-else class="el-icon-minus"/>-->
             <svg-icon v-if="!scope.row.tree_expand" icon-class='iconwenjianjia'/>
             <svg-icon v-else icon-class='iconwenjianjia1'/>
            </span>
            <span v-if="scope.row.ifLastLevel == 1||scope.row.type == 'menu'"
              class="tree-ctrl"
            >
              <svg-icon icon-class='icongeshi_tongyongwendang'/>
              <!--<i v-if="scope.row.ifLastLevel == 1" class="el-icon-document"/>-->
            </span>
          </template>
          <template v-if="item.checkbox">
            <el-checkbox
              v-if="scope.row[defaultChildren]&&scope.row[defaultChildren].length>0"
              :style="{'padding-left':+scope.row.tree_level*indent + 'px'} "
              :indeterminate="scope.row.tree_select"
              v-model="scope.row.tree_select"
              @change="handleCheckAllChange(scope.row)"
            />
            <el-checkbox
              v-else
              :style="{'padding-left':+scope.row.tree_level*indent + 'px'} "
              v-model="scope.row.tree_select"
              @change="handleCheckAllChange(scope.row)"
            />
          </template>
          <template v-if="scope.row.tree_show">{{ scope.row[item.value] }}</template>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import treeToArray, { addAttrs } from "./eval.js";

  export default {
    name: "basicTableTree",
    props: {
      data: {
        type: Array,
        required: true,
        default: () => []
      },
      columns: {
        type: Array,
        default: () => []
      },
      defaultExpandAll: {
        type: Boolean,
        default: false
      },
      defaultChildren: {
        type: String,
        default: "children"
      },
      indent: {
        type: Number,
        default: 18
      },
      height: {
        type: [Number, String],
        default: 500
      },
      rowClick: {
        type: Function,
        default: () => () => {}
      },
      minHeight: {
        type: Number,
        default: 500
      },
      filterNodeMethod: Function,
      spanMethod: Function,
      rowKey: String,
      reserveSelection: Boolean,
      pushData: Array
    },
    data() {
      return {
        guard: 1,
      };
    },
    computed: {
      children() {
        return this.defaultChildren;
      },
      tableData: {
        get: function() {
          const data = this.data;
          if (this.data.length === 0) {
            return [];
          }
          addAttrs(data, {
            expand: this.defaultExpandAll,
            children: this.defaultChildren
          });
          const retval = treeToArray(data, this.defaultChildren);
          // console.log('computed',retval)
          return retval;
        }
      }
    },
    methods: {
      addBrother(row, data) {
        if (row.tree_parent) {
          row.tree_parent.children.push(data);
        } else {
          if(this.pushData) {
            this.pushData.push(data)
          } else {
            this.data.push(data);
          }
        }
      },
      addChild(row, data) {
        if (!row.children) {
          this.$set(row, "children", []);
        }
        row.children.push(data);
        this.$set(row, "tree_expand", true);
      },
      delete(row) {
        const { tree_index, tree_parent } = row;
        if (tree_parent) {
          tree_parent.children.splice(tree_index, 1);
        } else {
          this.data.splice(tree_index, 1);
        }
      },
      deleteAllChildrens(row){
        const {children} = row;
        if (children) {
          row.children.splice(0, children.length);
        }
      },
      getData() {
        return this.tableData;
      },
      showRow: function({ row }) {
        // console.log('this.data',this.data);
        if (row.tree_visible) {
          // console.log("row.name" + row.name, row.code);
          const parent = row.tree_parent;
          const show = parent ? parent.tree_expand && parent.tree_show : true;
          row.tree_show = show;
          // return show
          //   ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
          //   : "display:none;";
          return show
            ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
            : "display:none;";
        }
        else {
          // console.log("display:none-row.tree_show" + row.name, row.tree_show);
          return "display:none;";
        }
      },
      showSperadIcon(record) {
        return true; //record[this.children] && record[this.children].length > 0;
      },
      toggleExpandedAll(expand) {
        for (let row of this.tableData) {
          this.$set(row, "tree_expand", expand);
        }
      },
      toggleExpanded(trIndex) {
        const record = this.tableData[trIndex];
        const expand = !record.tree_expand;
        record.tree_expand = expand;
        this.$nextTick(() => {
          this.$refs.refElTable.doLayout();
        })
      },
      toggleExpandedRow(tree_id) {
        if (tree_id) {
          for (let row of this.tableData) {
            if (tree_id == row.tree_id) {
              if (!row.tree_expand) {
                this.$set(row, "tree_expand", true);
                break;
              }
            }
          }
        }
      },
      handleCheckAllChange(row) {
        this.selcetRecursion(row, row.tree_select, this.defaultChildren);
        this.isIndeterminate = row.tree_select;
      },
      selcetRecursion(row, select, children = "children") {
        if (select) {
          this.$set(row, "tree_expand", true);
          this.$set(row, "tree_show", true);
        }
        const sub_item = row[children];
        if (sub_item && sub_item.length > 0) {
          sub_item.map(child => {
            child.tree_select = select;
            this.selcetRecursion(child, select, children);
          });
        }
      },
      updateTreeNode(item) {
        return new Promise(resolve => {
          const { tree_id, tree_parent } = item;
          const index = tree_id.split("-").slice(-1)[0]; // get last index
          if (tree_parent) {
            tree_parent.children.splice(index, 1, item);
            resolve(this.data);
          } else {
            this.data.splice(index, 1, item);
            resolve(this.data);
          }
        });
      },
      toggleSelection(array) {
        if (array&&array.length>0) {
          this.$refs.refElTable.clearSelection();
          this.tableData.forEach(row => {
            for (let arrayRow of array) {
              if (arrayRow.id == row.id) {
                this.$refs.refElTable.toggleRowSelection(row, true);
                break;
              }
            }
          });
        } else {
          this.$refs.refElTable.clearSelection();
        }
      },
      toggleRowSelection(row, selected) {
        this.$refs.refElTable.toggleRowSelection(row.id, selected)
      },
      setCurrentRow(currentRow, isId = false) {
        if (currentRow) {
          for (let row of this.tableData) {
            if (isId) {
              if (currentRow.id == row.id) {
                this.$refs.refElTable.setCurrentRow();
                this.$refs.refElTable.setCurrentRow(row);
                break;
              }
            } else {
              if (currentRow.treeId == row.treeId) {
                this.$refs.refElTable.setCurrentRow();
                this.$refs.refElTable.setCurrentRow(row);
                break;
              }
            }
          }
        } else {
          this.$refs.refElTable.setCurrentRow();
        }
      },
      /**
       * 执行常规更新树操作
       * @param changedData 已更改的数据
       * @param treeData 原数据表数据
       */
      updateTableTreeData(changedData, callback) {
        const changedIds = changedData.map(row => row.treeId);
        this.tableData.forEach((row, index, array) => {
          if (changedIds.includes(row.treeId)) {
            for (let changedDataRow of changedData) {
              if (row.treeId == changedDataRow.treeId) {
               Object.assign(row, changedDataRow);
                break;
              }
            }
          }
        })
        if (typeof callback === "function") {
          callback();
        }
      },
      filter(value) {
        if (!this.filterNodeMethod)
          throw new Error("无【filterNodeMethod】方法！");
        const filterNodeMethod = this.filterNodeMethod;

        const traverse = function (node) {
          const childNodes = node.root ? node.data : node.children;
          childNodes.forEach(child => {
            child.tree_visible = filterNodeMethod.call(
              child,
              value,
              child.children,
              child
            );
            traverse(child);
          });
          // console.log(node.code+'-'+node.name+'-'+node.tree_visible)
          if (node.tree_visible && childNodes.length) {
            let allHidden = true;

            childNodes.forEach((child) => {
              if (child.tree_visible) allHidden = false;
            });
            node.tree_visible = allHidden === false;
          }
          if (!value) return;

          if (node.tree_visible && node.ifLastLevel == 2) {
            node.tree_expand = true;
          }
        };
        this.root=true;
        this.tree_visible=true;
        traverse(this);
        this.$nextTick(() => {
          this.$refs.refElTable.doLayout();
        })
      }
    }
  };
</script>

<style>
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    vertical-align: -1px;
  }
</style>
