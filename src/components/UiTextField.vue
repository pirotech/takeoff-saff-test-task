<template>
  <label class="ui-text-field">
    <p class="ui-text-field__label">{{label}}</p>
    <input
      class="ui-text-field__input"
      type="text"
      :value="value"
      @input="onChange"
    />
    <p class="ui-text-field__error">{{error}}</p>
  </label>
</template>

<script>
export default {
  name: 'UiTextField',
  props: {
    label: String,
    value: String,
    error: String,
    onChange: Function
  }
}
</script>

<style scoped lang="scss">
.ui-text-field {
  display: flex;
  flex-direction: column;
  &__label {
    font-size: 14px;
    color: #333333;
  }
  &__input {
    width: 270px;
    margin-top: 4px;
    @media (max-width: 576px) {
      width: 220px;
    }
  }
  &__error {
    min-width: 1px;
    min-height: 14px;
    margin-top: 2px;
    font-size: 12px;
    color: #d45;
  }
}
</style>
