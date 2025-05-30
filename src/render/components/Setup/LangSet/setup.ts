import { reactive } from 'vue'
import { initCustomerLang, loadCustomerLang } from '@lang/loader'
import { resolve } from 'path-browserify'
import { shell } from '@/util/NodeFn'

export const LangSetup = reactive({
  loading: false,
  async doLoad() {
    if (this.loading) {
      return
    }
    this.loading = true
    await loadCustomerLang()
    this.loading = false
  },
  async openLangDir() {
    await initCustomerLang()
    const langDir = resolve(window.Server.BaseDir!, '../lang')
    shell.openPath(langDir).then().catch()
  }
})
