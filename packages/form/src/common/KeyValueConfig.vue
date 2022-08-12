<template>
  <div class="starfish-formitem" :class="drag ? 'formCover' : ''">
    <div class="label">
      <label>{{ item.data.label }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip v-if="item.data.tip" class="item" effect="dark" :content="item.data.tip" placement="top">
        <span class="tip iconfont icon-tishi"></span>
      </el-tooltip>
    </div>
    <div class="control">
      <div class="keyValueItem" v-for="(items, index) in data[item.data.fieldName].items" :key="index">
        <div class="keyValueSelect">
          <el-checkbox v-model="items.select" @change="getChangeSelect(items)"></el-checkbox>
        </div>
        <div class="keyValueInput">
          <div class="inputItem">
            <span>文本：</span>
            <div>
              <el-input v-model="items.label" size="small" @input="getChangeValue(items)" />
            </div>
          </div>
          <div class="inputItem">
            <span>值：</span>
            <div>
              <el-input v-model="items.value" size="small" @input="getChangeValue(items)" />
            </div>
          </div>
        </div>
        <div class="keyValueControl">
          <div class="add" @click="addItem(index)">
            <i class="iconfont icon-zengjia"></i>
          </div>
          <div class="remove" @click="removeItem(index)">
            <i class="iconfont icon-shanchu"></i>
          </div>
          <div class="top" @click="handleTop(index)">
            <i class="iconfont icon-shangyi"></i>
          </div>
          <div class="bottom" @click="handleBottom(index)">
            <i class="iconfont icon-xiayi"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { getFormConfig } from "../utils/fieldConfig";
  import fieldProps from "../utils/fieldProps";
  import { useWatch } from "../utils/customHooks";
  export default defineComponent({
    ControlType: "KeyValueConfig", // 必须与文件名匹配
    nameCn: "键值对匹配",
    icon: "icon-danxuankuang",
    isHide: true,
    formConfig: getFormConfig("KeyValueConfig"),
    props: {
      ...fieldProps,
    },
    setup(props) {
      useWatch(props.data);
      function getMaxId() {
        let maxId = 0;
        const data: any = props.data;
        const item: any = props.item;
        const allItems = data[item.data.fieldName];
        allItems.items.forEach((item: any) => {
          maxId = Math.max(item.id, maxId);
        });
        return maxId + 1;
      }
      return {
        getChangeValue(sitem: any) {
          const data: any = props.data;
          const item: any = props.item;
          const allItems = data[item.data.fieldName];
          allItems.value = sitem.value;
          allItems.id = sitem.id;
        },
        getChangeSelect(sitem: any) {
          const data: any = props.data;
          const item: any = props.item;
          const allItems = data[item.data.fieldName];
          if (sitem.select) {
            allItems.value = sitem.value;
            allItems.id = sitem.id;
            allItems.items.forEach((item: any) => {
              if (item.id !== sitem.id) {
                item.select = false;
              }
            });
          } else {
            let isHave = false;
            allItems.items.forEach((item: any) => {
              if (item.select) {
                isHave = true;
              }
            });
            if (!isHave) {
              allItems.value = "";
              allItems.id = "";
            }
          }
        },
        removeItem(index: number) {
          const data: any = props.data;
          const item: any = props.item;
          const allItems = data[item.data.fieldName];
          if (allItems.items.length <= 1) return;
          allItems.items.splice(index, 1);
        },
        handleTop(index: number) {
          if (index > 0) {
            const data: any = props.data;
            const item: any = props.item;
            const allItem = data[item.data.fieldName].items;
            const newItem = allItem.splice(index, 1)[0];
            allItem.splice(index - 1, 0, newItem);
          }
        },
        handleBottom(index: number) {
          const data: any = props.data;
          const item: any = props.item;
          const allItem = data[item.data.fieldName].items;
          if (index < allItem.length - 1) {
            const newItem = allItem.splice(index, 1)[0];
            allItem.splice(index + 1, 0, newItem);
          }
        },
        addItem(index: number) {
          const maxId = getMaxId();
          const data: any = props.data;
          const item: any = props.item;
          const allItems = data[item.data.fieldName];
          allItems.items.splice(index + 1, 0, {
            label: "选项" + maxId,
            value: "选项" + maxId,
            select: false,
            id: maxId,
          });
        },
      };
    },
  });
</script>

