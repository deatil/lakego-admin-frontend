<template>
  <PageWrapper title="账号信息" content="修改当前登陆账号的信息！">
    <ScrollContainer>
      <div ref="wrapperRef" :class="prefixCls">
        <Tabs tab-position="left" :tabBarStyle="tabBarStyle">
          <template v-for="item in settingList" :key="item.key">
            <TabPane :tab="item.name">
              <component :is="item.component" />
            </TabPane>
          </template>
        </Tabs>
      </div>
    </ScrollContainer>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tabs } from 'ant-design-vue';

  import { PageWrapper } from '/@/components/Page';
  import { ScrollContainer } from '/@/components/Container/index';
  import { settingList } from './data';

  import BaseSetting from './BaseSetting.vue';

  export default defineComponent({
    components: {
      ScrollContainer,
      Tabs,
      TabPane: Tabs.TabPane,
      BaseSetting,
      PageWrapper,
    },
    setup() {
      return {
        prefixCls: 'account-setting',
        settingList,
        tabBarStyle: {
          width: '220px',
        },
      };
    },
  });
</script>

<style lang="less">
  .account-setting {
    margin: 12px;
    padding: 30px 20px;
    background-color: @component-background;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: @item-active-bg;
    }
  }
</style>
