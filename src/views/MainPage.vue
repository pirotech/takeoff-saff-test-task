<template>
  <a-layout class="main-page">
    <a-layout-header class="main-page-header">
      <div class="main-page__logo"></div>
    </a-layout-header>
    <a-layout-content class="main-page-content">
      <a-card>
        <a-row>
          <a-col :span="12" :offset="6">
            <a-input-search
              placeholder="Search"
              enter-button="Search"
              size="large"
              :loading="false"
              @search="onSearch"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-list :data-source="contacts">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta :description="item.phone">
                <p slot="title">{{item.name}}</p>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-row>
      </a-card>
    </a-layout-content>
    <a-layout-footer>
      No name company &copy; 2020
    </a-layout-footer>
  </a-layout>
</template>

<script>
import contactsApi from "../api/contacts";

export default {
  name: 'MainPage',
  data() {
    return {
      contacts: []
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    }
  },
  created() {
    contactsApi.getContacts().then(result => {
      this.contacts = result.data;
    }).catch(error => {
      console.error(error);
    })
  }
}
</script>

<style scoped lang="scss">
.main-page {
  min-height: 100vh;
  &-header {
    display: flex;
    align-items: center;
  }
  &__logo {
    width: 120px;
    height: 30px;
    background-color: floralwhite;
    border-radius: 2px;
  }
  &-content {
    padding: 50px;
    &-wrapper {
      background-color: white;
      border-radius: 2px;
    }
  }
}
</style>
