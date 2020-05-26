<template>
  <div class="chat">
    <ul class="chat-contacts" :class="{'chat-contacts_shown': menu}">
      <li
        class="chat-contacts-item"
        :class="{'chat-contacts-item_active': ownerChatActive}"
        @click="setActiveChat(owner.chat)"
      >
        <i class="chat-contacts-item__picture"></i>
        <span class="chat-contacts-item__name">Мои сообщения</span>
      </li>
      <li
        v-for="chat in preparedChats"
        :key="chat.id"
        class="chat-contacts-item"
        :class="{'chat-contacts-item_active': activeChat && chat.id === activeChat.id}"
        @click="setActiveChat(chat)"
      >
        <i
          class="chat-contacts-item__picture"
          :style="chat.picture ? {
            background: `no-repeat center center url(${chat.picture})`,
            backgroundColor: '#eee',
            backgroundSize: 'cover'
          } : {}"
        ></i>
        <span class="chat-contacts-item__name">
          {{chat.name}}
        </span>
      </li>
    </ul>
    <button class="chat-trigger" @click="turnMenus">≡</button>
    <div class="chat-dialog">
      <ul class="chat-dialog-messages" v-if="activeChat">
        <li
          v-for="message in activeChat.messages"
          :key="message.id"
          class="chat-dialog-messages__item"
          :class="['chat-dialog-messages__item' + (message.authorId === owner.id ? '_right' : '_left')]"
        >{{message.text}}</li>
      </ul>
      <div class="chat-dialog-message-field" v-if="activeChat">
        <input
          class="message-field__input"
          type="text"
          v-model="message"
          @keyup.enter="sendMessage"
        />
        <button
          class="message-field__button"
          @click="sendMessage"
        >Отправить</button>
        <button
          class="message-field__button message-field__button_icon"
          @click="sendMessage"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    owner: Object,
    chats: Array,
    onSendMessage: Function,
    onSendYourself: Function
  },
  data() {
    return {
      activeChat: null,
      message: '',
      menu: false
    };
  },
  computed: {
    ownerChatActive() {
      return this.activeChat && this.owner.chat.id === this.activeChat.id;
    },
    preparedChats() {
      return this.chats && this.chats.map(chat => {
        // take first NO owner user
        // his name is chat name
        const first = chat.members.find(item => item.id !== this.owner.id);
        return {
          ...chat,
          name: first && first.name,
          picture: first && first.picture
        };
      });
    }
  },
  methods: {
    setActiveChat(value) {
      this.activeChat = value;
    },
    sendMessage() {
      if (this.message) {
        if (this.ownerChatActive) {
          this.onSendYourself(this.message, this.owner.id);
        } else {
          this.onSendMessage(this.message, this.owner.id, this.activeChat.id);
        }
        this.message = '';
      }
    },
    turnMenus() {
      this.menu = !this.menu;
    }
  }
}
</script>

<style scoped lang="scss">
.chat {
  display: flex;
  align-items: stretch;
  @media (max-width: 576px) {
    position: relative;
  }
  &-contacts {
    width: 40%;
    color: #333333;
    @media (max-width: 576px) {
      position: absolute;
      width: 100%;
      left: -100%;
      height: 100%;
      background-color: white;
      z-index: 100;
      transition: all .4s ease-in-out;
    }
    &_shown {
      left: 0;
    }
    &-item {
      display: flex;
      align-items: center;
      padding: 12px;
      cursor: pointer;
      transition: background-color .3s;
      user-select: none;
      @media (max-width: 1200px) {
        padding: 10px;
      }
      &:hover {
        background-color: #fafafa;
      }
      &_active {
        border-right: 2px solid #cccccc;
        background-color: #fafafa;
      }
      &__picture {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #eee;
        border-radius: 50%;
        @media (max-width: 1200px) {
          width: 30px;
          height: 30px;
        }
      }
      &__name {
        margin-left: 10px;
      }
    }
  }
  &-trigger {
    position: absolute;
    left: 50%;
    top: 0;
    display: none;
    width: 20px;
    height: 20px;
    padding: 0;
    margin-left: -10px;
    border: none;
    background-color: #ccc;
    z-index: 1000;
    transition: margin-left .2s;
    align-self: center;
    color: white;
    margin-top: 2px;
    font-weight: bold;
    line-height: 20px;
    font-size: 16px;
    @media (max-width: 576px) {
      display: inline-block;
    }
    &:hover {
    }
  }
  &-dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    background-color: #f6f6f6;
    @media (max-width: 576px) {
      width: 100%;
    }
    &-messages {
      display: flex;
      flex-direction: column;
      padding: 20px;
      &__item {
        display: inline-block;
        max-width: 80%;
        padding: 8px 12px;
        margin-top: 10px;
        background-color: #ffffff;
        color: #333333;
        border-radius: 2px;
        &:first-child {
          margin-top: 0;
        }
        &_left {
          align-self: flex-start;
          text-align: left;
        }
        &_right {
          align-self: flex-end;
          text-align: right;
        }
      }
    }
    &-message-field {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 0;
      width: 100%;
      .message-field {
        &__input {
          width: 100%;
          padding: 14px 18px;
          font-size: 16px;
          color: #fff;
          border: none;
          border-radius: 0;
          background-color: #b3b3b3;
          @media (max-width: 1200px) {
            padding: 12px 14px;
            font-size: 14px;
          }
        }
        &__button {
          position: absolute;
          right: 0;
          padding: 14px 18px;
          font-size: 16px;
          letter-spacing: 1.2px;
          color: #fff;
          text-transform: uppercase;
          border: none;
          border-radius: 0;
          background-color: #a1a1a1;
          transition: background-color 0.3s;
          @media (max-width: 1200px) {
            padding: 12px 14px;
            font-size: 14px;
          }
          @media (max-width: 576px) {
            display: none;
          }
          &:hover {
            background-color: #979797;
          }
          &_icon {
            right: 5px;
            display: none;
            height: 35px;
            width: 35px;
            padding: 0;
            border-radius: 50%;
            @media (max-width: 576px) {
              display: inline-block;
              background: no-repeat center center url("../assets/letter.png");
              background-size: 23px;
            }
          }
        }
      }
    }
  }
}
</style>
