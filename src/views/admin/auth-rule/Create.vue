<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="添加账号"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model">

      </BasicForm>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { entityToString } from '/@/utils/index';

  import { 
    getAuthRuleChildren,
    createAuthRule 
  } from '/@/api/sys/auth-rule';
  import { schemas } from './data/create';
  
  export default defineComponent({
    components: { 
      BasicModal, 
      BasicForm 
    },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const { createMessage } = useMessage();
      
      const modelRef = ref({});

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

        let parentOptions = [
          { key: '0', value: '0', label: '顶级权限' }
        ]

        const all = parents.list;

        all.forEach(item => {
          parentOptions.push({
            key: item.id,
            value: item.id,
            label: entityToString(item.spacer) + ' ' + item.title + '【' + item.method + '】'
          });
        });

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

          createAuthRule({
            "parentid": data.parentid,
            "title": data.title,
            "method": data.method,
            "url": data.url,
            "slug": data.slug,
            "description": data.description,
            "listorder": data.listorder,
            "status": data.status,
          }).then(() => {
            createMessage.success('账号添加成功！');

            modelRef.value = [];
            closeModal();
          });
        } catch (error) {}
      }

      function onDataReceive(data) {
        modelRef.value = data;
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return { 
        register, 
        handleOk,
        schemas, 
        registerForm, 
        model: modelRef, 
        handleVisibleChange 
      };
    },
  });
</script>
