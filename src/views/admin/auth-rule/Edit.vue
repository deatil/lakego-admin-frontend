<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="编辑账号"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model">
        <template #parentidSelect="{ model, field }">
          <Select
            showSearch
            allowClear
            placeholder="请选择一个父级"
            v-model:value="model[field]"
            optionFilterProp="label"
            :options="parentIdOptions"
            :filterOption="parentidSelectFilterOption"
          />
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, unref, ref, nextTick, computed } from 'vue';
  import { Select } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { cloneDeep } from 'lodash-es';
  import { entityToString } from '/@/utils/index';

  import { 
    getAuthRuleChildren,
    updataAuthRule,
  } from '/@/api/sys/auth-rule';

  import { schemas } from './data/edit';
  
  export default defineComponent({
    components: { 
      Select,
      BasicModal, 
      BasicForm 
    },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const { createMessage } = useMessage();

      const id = ref("");
      const modelRef = ref({});
      const parentidOptions = ref([]);

      const [
        registerForm,
        {
          validate,
          updateSchema,
        },
      ] = useForm({
        layout: "vertical",
        schemas,
        showActionButtonGroup: false,
        autoSubmitOnEnter: true,
        submitFunc: handleOk,
      });

      const [register, { closeModal }] = useModalInner(async (data) => {
        data && onDataReceive(data);

        let parents = await getAuthRuleChildren({
          "type": "list",
          "id": "0",
        });

        let childIds = await getAuthRuleChildren({
          "type": "ids",
          "id": id.value,
        });

        let parentOptions = [
          { key: '0', value: '0', label: '顶级权限' }
        ]
        
        const all = parents.list;
        const children = childIds.list;

        children.push(id.value)
        all.forEach(item => {
          if (!children.includes(item.id)) {
            parentOptions.push({
              key: item.id,
              value: item.id,
              label: entityToString(item.spacer) + ' ' + item.title + '【' + item.method + '】'
            });
          }
        });

        parentidOptions.value = parentOptions;

        updateSchema({
          field: 'parentid',
          componentProps: { 
            options: parentOptions,
           },
        });
      });

      //表单提交
      async function handleOk() {
        try {
          const data = await validate();

          updataAuthRule(id.value, {
            "parentid": data.parentid,
            "title": data.title,
            "method": data.method,
            "url": data.url,
            "slug": data.slug,
            "description": data.description,
            "listorder": data.listorder,
            "status": data.status,
          }).then(() => {
            createMessage.success('权限菜单修改成功！');

            modelRef.value = [];
            closeModal();
          });
        } catch (error) {}
      }

      function onDataReceive(data) {
        id.value = data.id;

        modelRef.value = data;
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      function parentidSelectFilterOption(input, option) {
        if (option && option.props && option.props.label) {
          return option.props.label === input || option.props.label.indexOf(input) !== -1
        } else {
          return true
        }
      }

    const parentIdOptions = computed(() => {
      return cloneDeep(unref(parentidOptions)).map((op) => {
        return op;
      });
    });

      return { 
        register, 
        handleOk,
        schemas, 
        registerForm, 
        model: modelRef, 
        handleVisibleChange,
        parentidSelectFilterOption,
        parentIdOptions
      };
    },
  });
</script>
