<template>
  <Footer :class="prefixCls" v-if="getShowLayoutFooter" ref="footerRef">
    <div>
      Copyright &copy;{{ copytightTime }} 
      <a @click="openWindow(GITHUB_URL)" class="text-secondary">{{ systemName }}</a>
    </div>
  </Footer>
</template>

<script lang="ts">
  import { computed, defineComponent, unref, ref } from 'vue';
  import { Layout } from 'ant-design-vue';

  import { GITHUB_URL } from '/@/settings/siteSetting';
  import { openWindow } from '/@/utils';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useRouter } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLayoutHeight } from '../content/useContentViewHeight';

  import { LakegoEnum } from '/@/enums/lakegoEnum';

  export default defineComponent({
    name: 'LayoutFooter',
    components: { Footer: Layout.Footer },
    setup() {
      const { t } = useI18n();
      const { getShowFooter } = useRootSetting();
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-footer');

      const footerRef = ref<ComponentRef>(null);
      const { setFooterHeight } = useLayoutHeight();

      const getShowLayoutFooter = computed(() => {
        if (unref(getShowFooter)) {
          const footerEl = unref(footerRef)?.$el;
          setFooterHeight(footerEl?.offsetHeight || 0);
        } else {
          setFooterHeight(0);
        }
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
      });

      const systemName = LakegoEnum.TITLE;
      const copytightTime = LakegoEnum.COPYRIGHT_TIME;

      return {
        getShowLayoutFooter,
        prefixCls,
        t,
        footerRef,
        openWindow,
        GITHUB_URL,
        copytightTime,
        systemName,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(0, 0, 0, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;

    &__links {
      margin-bottom: 8px;

      a {
        color: @normal-color;

        &:hover {
          color: @hover-color;
        }
      }
    }

    &__github {
      margin: 0 30px;

      &:hover {
        color: @hover-color;
      }
    }
  }
</style>
