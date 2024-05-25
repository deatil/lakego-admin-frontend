<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="编辑用户组"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
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
    getAuthGroupChildren,
    updataAuthGroup,
  } from '/@/api/sys/auth-group';

  import { schemas } from './data/edit';
  
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

      const id = ref("");
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

        let parents = await getAuthGroupChildren({
          "type": "list",
          "id": "0",
        });

        let childIds = await getAuthGroupChildren({
          "type": "ids",
          "id": id.value,
        });

        let parentOptions = [
          { key: '0', value: '0', label: '顶级用户组' }
        ]
        
        const all = parents.list;
        const children = childIds.list;

        children.push(id.value)
        all.forEach(item => {
          if (!children.includes(item.id)) {
            parentOptions.push({
              key: item.id,
              value: item.id,
              label: entityToString(item.spacer) + ' ' + item.title,
            });
          }
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

          updataAuthGroup(id.value, {
            "parentid": data.parentid,
            "title": data.title,
            "method": data.method,
            "url": data.url,
            "slug": data.slug,
            "description": data.description,
            "listorder": data.listorder,
            "status": data.status,
          }).then(() => {
            createMessage.success('用户组修改成功！');

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
