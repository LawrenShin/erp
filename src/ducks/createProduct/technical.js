import { take, takeEvery, put, call } from 'redux-saga/effects'
import { createAction } from '../../actions'

export const nameProperly = (name) =>  name.replace(/[\/,\s,\-]/g, '_').toUpperCase()

export const initialState = () => ({
  kinds: '',
  size: '',
  purpose: '',
  category: '',
  length: '',
  typepocket: '',
  levelwaist: '',
  kindneck: '',
  kindfastener: '',
  silhouettes: '',
  kindstrap: '',
  product_care_recomendation: '',
  shell_fabric_tab: {
    shell_fabric_1: '',
    shell_fabric_2: '',
    shell_fabric_3: '',
    weight_1: '',
    weight_2: '',
    weight_3: '',
    composition_1: '',
    composition_2: '',
    composition_3: ''
  },
  checkboxes: {
    drip_dry: false,
    do_not_wash: false,
    line_dry: false,
    machine_wash_cold: false,
    professional_drycleaning: false,
    do_not_bleach: false,
    do_not_iron_deco: false,
    do_not_dry_clean: false,
    gentle_wash_up_to_30c: false,
    iron_up_to_200c: false,
    flat_dry: false,
    do_not_iron: false,
    cold_iron: false,
    iron_steam: false,
    do_not_tumble_dry: false,
    iron_on_reversed_side: false,
    hand_wash: false,
    color_may_fade_with_light_chlorin: false,
    deco_detail_sh_be_remove_before: false,
    iron_steam_on_reverse_side: false,
    bleach_when_needed: false,
    do_not_wring: false,
    any_bleach_allowed: false,
    machine_wash_warm: false
  }
})

export default function reducer(state = initialState(), action){
  const { type, payload } = action

  switch(type){
    case 'SET_KINDS': 
      return { ...state, kinds: payload }
    case 'SET_SIZE': 
      return { ...state, size: payload }
    case 'SET_PURPOSE': 
      return { ...state, purpose: payload }
    case 'SET_CATEGORY': 
      return { ...state, category: payload }
    case 'SET_LENGTH': 
      return { ...state, length: payload }
    case 'SET_TYPEPOCKET': 
      return { ...state, typepocket: payload }
    case 'SET_LEVELWAIST': 
      return { ...state, levelwaist: payload }
    case 'SET_KINDNECK': 
      return { ...state, kindneck: payload }
    case 'SET_KINDFASTENER': 
      return { ...state, kindfastener: payload }
    case 'SET_SILHOUETTES': 
      return { ...state, silhouettes: payload }
    case 'SET_KINDSTRAP': 
      return { ...state, kindstrap: payload }
    case 'SET_PRODUCT_CARE_RECOMENDATION': 
      return { ...state, product_care_recomendation: payload }
    case 'SET_SHELL_FABRIC_1': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, shell_fabric_1: payload } }
    case 'SET_SHELL_FABRIC_2': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, shell_fabric_2: payload } }
    case 'SET_SHELL_FABRIC_3': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, shell_fabric_3: payload } }
    case 'SET_WEIGHT_1': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, weight_1: payload } }
    case 'SET_WEIGHT_2': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, weight_2: payload } }
    case 'SET_WEIGHT_3': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, weight_3: payload } }
    case 'SET_COMPOSITION_1': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, composition_1: payload } }
    case 'SET_COMPOSITION_2': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, composition_2: payload } }
    case 'SET_COMPOSITION_3': 
      return { ...state, shell_fabric_tab: { ...state.shell_fabric_tab, composition_3: payload } }
      case "SET_DRIP_DRY":
        return { ...state, checkboxes:{ ...state.checkboxes, drip_dry: payload.checked } }
      case "SET_DO_NOT_WASH":
        return { ...state, checkboxes: { ...state.checkboxes, do_not_wash: payload.checked } }
      case "SET_LINE_DRY":
        return { ...state, checkboxes: { ...state.checkboxes, line_dry: payload.checked } }
      case "SET_MACHINE_WASH_COLD":
        return { ...state, checkboxes: { ...state.checkboxes, machine_wash_cold: payload.checked } }
      case "SET_PROFESSIONAL_DRYCLEANING":
        return { ...state, checkboxes: { ...state.checkboxes, professional_drycleaning: payload.checked } }
      case "SET_DO_NOT_BLEACH":
        return { ...state, checkboxes: { ...state.checkboxes, do_not_bleach: payload.checked } }
      case "SET_DO_NOT_IRON_DECO":
        return { ...state, checkboxes: { ...state.checkboxes, do_not_iron_deco: payload.checked } }
      case "SET_DO_NOT_DRY_CLEAN":
        return { ...state, checkboxes: { ...state.checkboxes, do_not_dry_clean: payload.checked } }
      case "SET_GENTLE_WASH_UP_TO_30C":
        return { ...state, checkboxes: { ...state.checkboxes, gentle_wash_up_to_30c: payload.checked } }
      case "SET_IRON_UP_TO_200C":
        return { ...state, checkboxes: { ...state.checkboxes, iron_up_to_200c: payload.checked } }
      case "SET_FLAT_DRY":
        return { ...state, checkboxes: { ...state.checkboxes, flat_dry: payload.checked } }
      case "SET_DO_NOT_IRON":
        return { ...state, checkboxes: { ...state.checkboxes, do_not_iron: payload.checked } }
      case "SET_COLD_IRON":
        return { ...state, checkboxes: { ...state.checkboxes, cold_iron: payload.checked } }
      case "SET_IRON_STEAM":
        return { ...state, checkboxes: { ...state.checkboxes, iron_steam: payload.checked } }
      case "SET_DO_NOT_TUMBLE_DRY":
        return { ...state, checkboxes: { ...state.checkboxes, do_not_tumble_dry: payload.checked } }
      case "SET_IRON_ON_REVERSED_SIDE":
        return { ...state, checkboxes: { ...state.checkboxes, iron_on_reversed_side: payload.checked } }
      case "SET_HAND_WASH":
        return { ...state, checkboxes: { ...state.checkboxes, hand_wash: payload.checked } }
      case "SET_COLOR_MAY_FADE_WITH_LIGHT_CHLORIN":
        return { ...state, checkboxes: { ...state.checkboxes, color_may_fade_with_light_chlorin: payload.checked } }
      case "SET_DECO_DETAIL_SH_BE_REMOVE_BEFORE":
        return { ...state, checkboxes: { ...state.checkboxes, deco_detail_sh_be_remove_before: payload.checked } }
      case "SET_IRON_STEAM_ON_REVERSE_SIDE":
        return { ...state, checkboxes: { ...state.checkboxes, iron_steam_on_reverse_side: payload.checked } }
      case "SET_BLEACH_WHEN_NEEDED":
        return { ...state, checkboxes: { ...state.checkboxes, bleach_when_needed: payload.checked } }
      case "SET_DO_NOT_WRING":
        return { ...state, checkboxes: { ...state.checkboxes, do_not_wring: payload.checked } }
      case "SET_ANY_BLEACH_ALLOWED":
        return { ...state, checkboxes: { ...state.checkboxes, any_bleach_allowed: payload.checked } }
      case "SET_MACHINE_WASH_WARM":
        return { ...state, checkboxes: { ...state.checkboxes, machine_wash_warm: payload.checked } }

    default:
      return state
  }
}

export function* saga({type, payload}){
  const { name, data } = payload
  const rename = nameProperly(name)
  switch(type){
    case 'TECHNICAL':
      yield put(createAction(`SET_${rename}`, data))
      break
    case 'TECHNICAL_CHECKBOX': 
      yield put(createAction(`SET_${rename}`, payload))
      break
  }
}