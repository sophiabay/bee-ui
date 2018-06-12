import SvueCurdCheckbox from './src/crud-checkbox'
import SvueCurdDate from './src/crud-date'
import SvueCurdTime from './src/crud-time'
import SvueCurdInput from './src/crud-input'
import SvueCurdRadio from './src/crud-radio'
import SvueCurdSelect from './src/crud-select'
import SvueCurdCascader from './src/crud-cascader'
import SvueCurdInputNumber from './src/crud-input-number'
import SvueCurdUeditor from './src/crud-ueditor'
import SvueCrud from './src/main'
const components = [
  SvueCrud,
  SvueCurdCheckbox,
  SvueCurdDate,
  SvueCurdTime,
  SvueCurdInput,
  SvueCurdRadio,
  SvueCurdSelect,
  SvueCurdCascader,
  SvueCurdInputNumber,
  SvueCurdUeditor
]

export default function(Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export {
  SvueCrud,
  SvueCurdCheckbox,
  SvueCurdDate,
  SvueCurdTime,
  SvueCurdInput,
  SvueCurdRadio,
  SvueCurdSelect,
  SvueCurdInputNumber,
  SvueCurdUeditor
}
