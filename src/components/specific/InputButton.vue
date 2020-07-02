<template>
  <label class="input">
    <input ref="input" :type="getType" :name="getName" :disabled="getDisabled" :checked="getChecked" />
    <span ref="button" class="button" :style="getStyle">
      <slot :content="getContent">{{ getContent }}</slot>
    </span>
  </label>
</template>

<script>
import { get, isObject, isString, isBoolean } from 'lodash';

export default {
  props: {
    type: {
      type: String,
      default: 'checkbox',
      required: false,
      validator($type) {
        return ['radio', 'checkbox'].indexOf($type) !== -1;
      }
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    checked: {
      type: Boolean,
      required: false,
      default: false
    },
    content: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    getCheckedBackgroundColor() {
      return get(this.$attrs, 'checked-background-color', null);
    },
    getShowCheckedShadow() {
      return get(this.$attrs, 'show-checked-shadow', null);
    },
    getStyle() {
      let style = get(this.$attrs, 'styles', null);
      style = isObject(style) ? style : {};
      return style;
    },
    getContent() {
      return this.content;
    },
    getChecked() {
      return this.checked;
    },
    getName() {
      return this.name;
    },
    getType() {
      return this.type;
    },
    getDisabled() {
      return this.disabled;
    }
  },
  async mounted() {
    await this.$nextTick();
    this.addListener();
  },
  async beforeDestroy() {
    await this.$nextTick();
    this.removeListener();
  },
  methods: {
    addListener() {
      const { input } = this.$refs;
      input.addEventListener('change', this.changeHandler);
    },
    removeListener() {
      const { input } = this.$refs;
      input.removeEventListener('change', this.changeHandler);
    },
    changeHandler(e) {
      const { button } = this.$refs;
      const isChecked = e.target.checked;
      const showShadow = this.getShowCheckedShadow;

      if (isChecked) {
        if (isString(this.getCheckedBackgroundColor)) {
          button.style.backgroundColor = this.getCheckedBackgroundColor;
        }

        if (isBoolean(showShadow)) {
          if (!showShadow) {
            button.style.boxShadow = 'unset';
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.input {
  display: flex;
  flex-wrap: no-wrap;
  position: relative;
  cursor: pointer;
  user-select: none;

  > * {
    display: flex;
    z-index: 1;
    cursor: pointer;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
  }

  > .button {
    opacity: 1;
    z-index: 2;
    width: auto;
    height: auto;
    padding: 20px;
    background-color: transparent;
    border: 1px solid rgb(40, 40, 40);
    color: rgb(40, 40, 40);
    text-transform: capitalize;
    border-radius: 10px;
    transition: background-color 0.5s ease;
  }

  & input:checked ~ .button {
    background-color: rgb(204, 50, 50);
    box-shadow: 0 1px rgb(134, 134, 134);
    margin-bottom: 5px;
    color: rgb(230, 230, 230);
    font-weight: 800;
  }
}
</style>
