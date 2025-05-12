<template>
  <Card title="项目信息" v-bind="$attrs">
    <template #extra>
      <a :href="moreurl" target="_blank">
        <a-button type="link" size="small">更多></a-button>
      </a>
    </template>

    <template v-for="item in items" :key="item">
      <CardGrid class="!md:w-1/3 !w-full">
        <span class="flex">
          <Icon :icon="item.icon" :color="item.color" size="30" />
          
          <span class="text-lg ml-4">{{ item.title }}</span>
        </span>

        <div class="flex mt-2 h-10 text-secondary">{{ item.desc }}</div>

        <div class="flex justify-between text-secondary">
          <span>
            <a :href="item.url" target="_blank">
              {{ item.group }}
            </a>
          </span>
          <span>{{ item.date }}</span>
        </div>
      </CardGrid>
    </template>
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { groupItems } from './data';

  const moreurl = "https://github.com/deatil/lakego-admin";

  export default defineComponent({
    components: { 
      Card, 
      CardGrid: Card.Grid, 
      Icon 
    },
    setup() {
      return { 
        moreurl: moreurl,
        items: groupItems,
      };
    },
  });
</script>
