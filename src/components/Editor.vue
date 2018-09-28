<template>
  <div class="tinymce-wrap">
    <slot name="beforeEditor"></slot>
    <textarea :id="id"></textarea>
    <div class="show-input" v-if="showImmediate">
      <div v-html="value"></div>
    </div>
    <slot name="afterEditor"></slot>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
/**
 * 富文本组件
 * @prop
 * id: 富文本id 每个页面需要保持唯一
 * value: 富文本显示以及传递的value
 * height： 富文本高度
 * showImmediate: 是否立即在下方显示编辑产生内容
 * setting： 自定义设置，参考tinymce
 * plugins： 富文本使用插件 参考tinymce
 * toolbar： 显示工具条toolbar：参考tinymce
 * slot： beforeEditor/afterEditor
 *
 * usage： <Editor id="demo" v-model ="value" :height="200" :setting="{}" show-immediate></Editor>
 */
export default {
  name: 'Editor',
  props: {
    // editorId
    id: {
      type: String,
      default: 'editor'
    },
    // 绑定value
    value: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 300
    },
    showImmediate: {
      type: Boolean,
      default: false
    },
    // settings
    setting: {
      type: Object,
      default: () => ({})
    },
    plugins: {
      type: String | Array,
      default: () => ['link', 'image', 'fullscreen', 'colorpicker', 'textcolor']
    },
    toolbar: {
      type: String | Array,
      default: 'bold italic underline strikethrough | fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat moticons forecolor backcolor | fullscreen'
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function (val, oldVal) {
        if (!this.change && this.hasInstance) {
          // deal last word empty
          this.$nextTick(() => tinymce.get(this.id).setContent(val || ''))
        }
      }
    }
  },
  data: () => ({
    hasInstance: false,
    fullscreen: false,
    change: false
  }),
  methods: {
    initTinymce () {
      const setting =
        {
          selector: `#${this.id}`,
          height: this.height,
          // language_url:"/static/tinymce/langs/zh_CN.js",
          // language: 'zh_CN',
          theme: "modern",
          body_class: 'panel-body ',
          object_resizing: false,
          // menubar: 'file edit insert view format table',
          skin_url: "static/tinymce/skins/lightgray",
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          default_link_target: '_blank',
          link_title: false,
          branding: false,
          nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
          init_instance_callback: (editor) => {
            this.hasInstance = true
            // back show
            if (this.value) {
              editor.setContent(this.value)
            }
            /* editor.on('input change undo redo', () => {
                const content = editor.getContent()
                this.$emit('input', content)
            }) */
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.change = true
              const content = editor.getContent()
              this.$emit('input', content)
            })
          },
          setup (editor) {
            editor.on('FullscreenStateChanged', (e) => {
              this.fullscreen = e.state
            })
          },
          toolbar: this.toolbar,
          plugins: this.plugins
        }
        // 合并setting
      Object.assign(setting, this.setting)
      tinymce.init(setting)
    },
    setContent (content) {
      tinymce.get(this.id).setContent(content)
    }
  },
  mounted () {
    console.log(this.showImmediate);
    this.initTinymce()
  },
  destroyed () {
    if (tinymce.get(this.id)) {
      console.log('remove tiny mce')
      tinymce.get(this.id).destroy()
    }
  }
}
</script>
<style>
.show-input{
  margin-top: 5px;
}
</style>


