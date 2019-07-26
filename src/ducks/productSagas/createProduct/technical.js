import {take, takeEvery, put, call} from 'redux-saga/effects'
import {createAction} from '../../../actions'

export const nameProperly = (name) => name.replace(/[\/,\s,\-]/g, '_').toUpperCase()

export const initialState = () => ({
    kind: '',
    size_grid: '',
    purpose: '',
    category: '',
    length: '',
    type_pocket: '',
    level_waist: '',
    kind_neck: '',
    kind_fastener: '',
    silhouette: '',
    kind_strap: '',
    sleeve: '',
    shell_fabric_1: null,
    shell_fabric_2: null,
    shell_fabric_3: null,
    shell_fabric_1_weight: null,
    shell_fabric_2_weight: null,
    shell_fabric_3_weight: null,
    shell_fabric_1_composition: null,
    shell_fabric_2_composition: null,
    shell_fabric_3_composition: null,
    shell_fabric_1_construction: null,
    shell_fabric_2_construction: null,
    shell_fabric_3_construction: null,
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
});

export default function reducer(state = initialState(), action) {
    const {type, payload} = action;

    switch (type) {
        case 'SET_KIND':
            return {...state, kind: payload};
        case 'SET_SIZE_GRID':
            return {...state, size_grid: payload};
        case 'SET_PURPOSE':
            return {...state, purpose: payload};
        case 'SET_CATEGORY':
            return {...state, category: payload};
        case 'SET_LENGTH':
            return {...state, length: payload};
        case 'SET_TYPE_POCKET':
            return {...state, type_pocket: payload};
        case 'SET_LEVEL_WAIST':
            return {...state, level_waist: payload};
        case 'SET_KIND_NECK':
            return {...state, kind_neck: payload};
        case 'SET_KIND_FASTENER':
            return {...state, kind_fastener: payload};
        case 'SET_SILHOUETTE':
            return {...state, silhouette: payload};
        case 'SET_KIND_STRAP':
            return {...state, kind_strap: payload};
        case 'SET_SLEEVE':
            return {...state, sleeve: payload};
        case 'SET_SHELL_FABRIC_1':
            return {...state, shell_fabric_1: payload};
        case 'SET_SHELL_FABRIC_2':
            return {...state, shell_fabric_2: payload};
        case 'SET_SHELL_FABRIC_3':
            return {...state, shell_fabric_3: payload};
        case 'SET_SHELL_FABRIC_1_WEIGHT':
            return {...state, shell_fabric_1_weight: payload};
        case 'SET_SHELL_FABRIC_2_WEIGHT':
            return {...state, shell_fabric_2_weight: payload};
        case 'SET_SHELL_FABRIC_3_WEIGHT':
            return {...state, shell_fabric_3_weight: payload};
        case 'SET_SHELL_FABRIC_1_COMPOSITION':
            return {...state, shell_fabric_1_composition: payload};
        case 'SET_SHELL_FABRIC_2_COMPOSITION':
            return {...state, shell_fabric_2_composition: payload};
        case 'SET_SHELL_FABRIC_3_COMPOSITION':
            return {...state, shell_fabric_3_composition: payload};
        case 'SET_SHELL_FABRIC_1_CONSTRUCTION':
            return {...state, shell_fabric_1_construction: payload};
        case 'SET_SHELL_FABRIC_2_CONSTRUCTION':
            return {...state, shell_fabric_2_construction: payload};
        case 'SET_SHELL_FABRIC_3_CONSTRUCTION':
            return {...state, shell_fabric_3_construction: payload};
        case "SET_DRIP_DRY":
            return {...state, checkboxes: {...state.checkboxes, drip_dry: payload.checked}};
        case "SET_DO_NOT_WASH":
            return {...state, checkboxes: {...state.checkboxes, do_not_wash: payload.checked}};
        case "SET_LINE_DRY":
            return {...state, checkboxes: {...state.checkboxes, line_dry: payload.checked}};
        case "SET_MACHINE_WASH_COLD":
            return {...state, checkboxes: {...state.checkboxes, machine_wash_cold: payload.checked}};
        case "SET_PROFESSIONAL_DRYCLEANING":
            return {...state, checkboxes: {...state.checkboxes, professional_drycleaning: payload.checked}};
        case "SET_DO_NOT_BLEACH":
            return {...state, checkboxes: {...state.checkboxes, do_not_bleach: payload.checked}};
        case "SET_DO_NOT_IRON_DECO":
            return {...state, checkboxes: {...state.checkboxes, do_not_iron_deco: payload.checked}};
        case "SET_DO_NOT_DRY_CLEAN":
            return {...state, checkboxes: {...state.checkboxes, do_not_dry_clean: payload.checked}};
        case "SET_GENTLE_WASH_UP_TO_30C":
            return {...state, checkboxes: {...state.checkboxes, gentle_wash_up_to_30c: payload.checked}};
        case "SET_IRON_UP_TO_200C":
            return {...state, checkboxes: {...state.checkboxes, iron_up_to_200c: payload.checked}};
        case "SET_FLAT_DRY":
            return {...state, checkboxes: {...state.checkboxes, flat_dry: payload.checked}};
        case "SET_DO_NOT_IRON":
            return {...state, checkboxes: {...state.checkboxes, do_not_iron: payload.checked}};
        case "SET_COLD_IRON":
            return {...state, checkboxes: {...state.checkboxes, cold_iron: payload.checked}};
        case "SET_IRON_STEAM":
            return {...state, checkboxes: {...state.checkboxes, iron_steam: payload.checked}};
        case "SET_DO_NOT_TUMBLE_DRY":
            return {...state, checkboxes: {...state.checkboxes, do_not_tumble_dry: payload.checked}};
        case "SET_IRON_ON_REVERSED_SIDE":
            return {...state, checkboxes: {...state.checkboxes, iron_on_reversed_side: payload.checked}};
        case "SET_HAND_WASH":
            return {...state, checkboxes: {...state.checkboxes, hand_wash: payload.checked}};
        case "SET_COLOR_MAY_FADE_WITH_LIGHT_CHLORIN":
            return {...state, checkboxes: {...state.checkboxes, color_may_fade_with_light_chlorin: payload.checked}};
        case "SET_DECO_DETAIL_SH_BE_REMOVE_BEFORE":
            return {...state, checkboxes: {...state.checkboxes, deco_detail_sh_be_remove_before: payload.checked}};
        case "SET_IRON_STEAM_ON_REVERSE_SIDE":
            return {...state, checkboxes: {...state.checkboxes, iron_steam_on_reverse_side: payload.checked}};
        case "SET_BLEACH_WHEN_NEEDED":
            return {...state, checkboxes: {...state.checkboxes, bleach_when_needed: payload.checked}};
        case "SET_DO_NOT_WRING":
            return {...state, checkboxes: {...state.checkboxes, do_not_wring: payload.checked}};
        case "SET_ANY_BLEACH_ALLOWED":
            return {...state, checkboxes: {...state.checkboxes, any_bleach_allowed: payload.checked}};
        case "SET_MACHINE_WASH_WARM":
            return {...state, checkboxes: {...state.checkboxes, machine_wash_warm: payload.checked}};

        default:
            return state
    }
}

export function* saga({type, payload}) {
    const {name, data} = payload;
    const rename = nameProperly(name);

    if (type === 'TECHNICAL') yield put(createAction(`SET_${rename}`, data));
    if (type === 'TECHNICAL_CHECKBOX') yield put(createAction(`SET_${rename}`, payload));
}