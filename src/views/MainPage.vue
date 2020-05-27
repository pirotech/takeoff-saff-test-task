<template>
  <a-layout class="main-page">
    <a-layout-header class="main-page-header">
      <div class="main-page__logo"></div>
    </a-layout-header>
    <a-layout-content class="main-page-content">
      <a-card>
        <a-row :gutter="[32, 32]">
          <a-col :span="12" :offset="6">
            <a-input-search
              class="main-page-search"
              placeholder="Search"
              enter-button="Search"
              size="large"
              :loading="false"
              @search="onSearch"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-list v-if="contacts" bordered :data-source="contacts">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta :description="item.phone">
                <p slot="title">{{item.name}}</p>
              </a-list-item-meta>
              <a-button class="mr-12" type="primary" @click="showEditModal(item)">Edit</a-button>
              <a-button type="danger" @click="removeContact(item)">Remove</a-button>
            </a-list-item>
            <div slot="footer">
              <a-button
                type="primary"
                @click="showCreateNewModal"
              >Create new</a-button>
            </div>
          </a-list>
        </a-row>
      </a-card>
    </a-layout-content>
    <a-layout-footer>
      No name company &copy; 2020
    </a-layout-footer>

    <a-modal
      title="Create new"
      :visible="createNew.modal"
      :confirm-loading="createNew.loading"
      @ok="createNewModalHandleOk"
      @cancel="createNewModalHandleCancel"
    >
      <a-form :form="createNew.form" :rules="createNew.rules">
        <a-form-item label="Name" required>
          <a-input v-decorator="createNew.decorators.name"></a-input>
        </a-form-item>
        <a-form-item label="Phone" required>
          <a-input v-decorator="createNew.decorators.phone"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      title="Edit"
      :visible="edit.modal"
      :confirm-loading="edit.loading"
      @ok="editModalHandleOk"
      @cancel="editModalHandleCancel"
    >
      <a-form :form="edit.form" :rules="edit.rules">
        <a-form-item label="Name" required>
          <a-input v-decorator="edit.decorators.name"></a-input>
        </a-form-item>
        <a-form-item label="Phone" required>
          <a-input v-decorator="edit.decorators.phone"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script>
import contactsApi from '../api/contacts';

export default {
  name: 'MainPage',
  data() {
    return {
      contacts: [],
      createNew: {
        modal: false,
        loading: false,
        form: this.$form.createForm(this, {name: 'createForm'}),
        decorators: {
          name: [
            'name',
            { rules: [{required: true, message: 'Name is required!'}] }
          ],
          phone: [
            'phone',
            { rules: [{required: true, message: 'Phone is required!'}] }
          ]
        }
      },
      edit: {
        modal: false,
        loading: false,
        form: this.$form.createForm(this, {name: 'editForm'}),
        decorators: {
          name: [
            'name',
            { rules: [{required: true, message: 'Name is required!'}] }
          ],
          phone: [
            'phone',
            { rules: [{required: true, message: 'Phone is required!'}] }
          ]
        }
      }
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },

    showCreateNewModal() {
      this.createNew.modal = true;
    },
    createNewModalHandleOk() {
      this.createNew.form.validateFields((errors, values) => {
        if (!errors) {
          this.createNew.loading = true;
          const { name, phone } = values;
          contactsApi.addContact(name, phone).then(response => {
            this.contacts.push(response.data);
            this.createNew.modal = false;
            this.createNew.loading = false;
            this.createNew.form.resetFields();
          }).catch(error => {
            console.error(error);
          });
        }
      });
    },
    createNewModalHandleCancel() {
      this.createNew.modal = false;
      this.createNew.loading = false;
      this.createNew.form.resetFields();
    },

    removeContact(removed) {
      this.$confirm({
        title: 'Remove contact',
        content: 'Are you sure want to remove contact?',
        onOk: () => this.removeModalHandleOk(removed),
        onCancel() {}
      });
    },
    removeModalHandleOk(removed) {
      contactsApi.removeContact(removed).then(() => {
        this.contacts = this.contacts.filter(item => item.id !== removed.id);
      }).catch(error => {
        console.error(error);
      })
    },

    showEditModal(edited) {
      const { id, name, phone } = edited;
      this.edit.modal = true;
      this.edit.id = id;
      this.$nextTick(() => {
        this.edit.form.setFieldsValue({name, phone});
      });
    },
    editModalHandleOk() {
      this.edit.form.validateFields((errors, values) => {
        if (!errors) {
          this.edit.loading = true;
          const { name, phone } = values;
          const edited = {
            id: this.edit.id,
            name,
            phone
          };
          contactsApi.editContact(edited).then(response => {
            this.contacts = this.contacts.map(item => (
              item.id === edited.id
                ? response.data
                : item
            ));
            this.edit.modal = false;
            this.edit.loading = false;
            this.edit.form.resetFields();
          }).catch(error => {
            console.error(error);
          });
        }
      });
    },
    editModalHandleCancel() {
      this.edit.modal = false;
      this.edit.loading = false;
      this.edit.form.resetFields();
    },
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
    &-search {
      margin-bottom: 16px;
    }
  }
  .mr-12 {
    margin-right: 12px;
  }
}
</style>
