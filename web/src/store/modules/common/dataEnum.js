import {
  getValidateStatusData,
  getEnabledData,
  GetSiginStatusData,
  getAuthData,
  getUserTypeData,
  getIsOrNotData,
  getGenderData,
  getOrgTypeData,
  getRoleTypeData,
  getJobStatusData,
  getHolidayTypeData,
  getReadStatus,
  getOperateData,
  getIfchange,
  getIncomeTypeEnum,
  getAuditStatusEnum,
  getSubFinBillTypeEnum,
  GetAmTypeData,
  GetEnabledEnumSchedule,
  getBillTypeData,
  getShouldPayOrderTypeData,
  GetOutTypeData,
  GetInTypeData,
  getPurchaseBillTypeEnum,
  getUseEnterpriseTypeEnum,
  getStockTypeData,
  GetAmTransportModeEnum,
  GetActivitiModelData,
  getProIncomeTypeEnum,
  getProCostTypeEnum,
  getProCostBillTypeEnum
} from '@/api/common/dataEnum'
import {staticDataEnum} from "@/assets/data/enum";

const state = {
  validateStatus: [],
  auditStatusEnum: [],
  enabled: [],
  auth: [],
  userType: [],
  isOrNot:[],
  gender: [],
  orgType: [],
  roleType: [],
  jobStatus: [],
  holidayType: [],
  readStatus: [],
  type: staticDataEnum.type,
  static: staticDataEnum,
  operate:[],
  siginStatus: [],
  ifchange: [],
  incomeType: [],
  subFinBillType:[],
  amType: [],
  enableEnumSchedule: [],
  billType: [],
  shouldPayOrderType: [],
  outType: [],
  purchaseBillType:[],
  useEnterpriseType: [],
  stockType:[],
  amTransportModeEnum: [],
  activitiModelData: [],
  proIncomeTypeEnum:[],
  proCostTypeEnum:[],
  proCostBillTypeEnum:[]
}
const getters = {}
const mutations = {
  VALIDATE_STATUS: (state, validateStatus) => {
    state.validateStatus = validateStatus
  },
  AUDIT_STATUS_ENUM: (state, auditStatusEnum) => {
    state.auditStatusEnum = auditStatusEnum
  },
  AM_TRANSPORT_MODE_ENUM: (state, amTransportModeEnum) => {
    state.amTransportModeEnum = amTransportModeEnum
  },
  ACTIVITI_MODEL_DATA: (state, activitiModelData) => {
    state.activitiModelData = activitiModelData
  },
  ENABLE_ENUM_SCHEDULE: (state, enableEnumSchedule) => {
    state.enableEnumSchedule = enableEnumSchedule
  },
  USE_ENTERPRISE_TYPE: (state, useEnterpriseType) => {
    state.useEnterpriseType = useEnterpriseType
  },
  BILL_TYPE: (state, billType) => {
    state.billType = billType
  },
  SHOWLD_PAY_ORDERTYPE: (state, shouldPayOrderType) => {
    state.shouldPayOrderType = shouldPayOrderType
  },
  AM_TYPE: (state, amType) => {
    state.amType = amType
  },
  ENABLED: (state, enabled) => {
    state.enabled = enabled
  },
  AUTH: (state, auth) => {
    state.auth = auth
  },
  USERTYPE: (state, userType) => {
    state.userType = userType
  },
  ISORNOT: (state, isOrNot) => {
    state.isOrNot = isOrNot
  },
  GENDER: (state, gender) => {
    state.gender = gender
  },
  ORG_TYPE: (state, orgType) => {
    state.orgType = orgType
  },
  ROLE_TYPE: (state, roleType) => {
    state.roleType = roleType
  },
  JOB_STATUS: (state, jobStatus) => {
    state.jobStatus = jobStatus
  },
 HOLIDAT_TYPE: (state, holidayType) => {
    state.holidayType = holidayType
  },
  READ_STATUS: (state, readStatus) => {
    state.readStatus = readStatus
  },
  OPERATE: (state, operate) => {
    state.operate = operate
  },
  SIGIN_STATUS: (state, siginStatus) => {
    state.siginStatus = siginStatus
  },
  IFCHANGE: (state, ifchange) => {
    state.ifchange = ifchange
  },
  INCOMETYPE: (state, incomeType) => {
    state.incomeType = incomeType
  },
  SUB_FIN_BILL_TYPE:(state, subFinBillType) =>{
    state.subFinBillType = subFinBillType
  },
  OUTTYPE: (state, outType) => {
    state.outType = outType
  },
  INTYPE: (state, inType) => {
    state.inType = inType
  },

  PURCHASE_BILL_TYPE:(state, purchaseBillType) =>{
    state.purchaseBillType = purchaseBillType
  },
  STOCK_TYPE: (state, stockType) => {
    state.stockType = stockType
  },
  PRO_INCOME_TYPE_ENUM:(state,proIncomeTypeEnum) =>{
    state.proIncomeTypeEnum = proIncomeTypeEnum
  },
  PRO_COST_TYPE_ENUM:(state,proCostTypeEnum) =>{
    state.proCostTypeEnum = proCostTypeEnum
  },
  PRO_COST_BILL_TYPE_ENUM:(state,proCostBillTypeEnum) =>{
    state.proCostBillTypeEnum = proCostBillTypeEnum
  },
}

const actions = {
  /**
   * 未审核/已审核
   */
  GetValidateStatusData({
                          commit, state
                        }) {
    return new Promise((resolve, reject) => {
      if (!(state.validateStatus && state.validateStatus.length > 0)) {
        getValidateStatusData().then(response => {
          commit('VALIDATE_STATUS', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 单位类型
   */
  GetUseEnterpriseTypeEnum({
                          commit, state
                        }) {
    return new Promise((resolve, reject) => {
      if (!(state.useEnterpriseType && state.useEnterpriseType.length > 0)) {
        getUseEnterpriseTypeEnum().then(response => {
          commit('USE_ENTERPRISE_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 审核状态，审批流程用
   */
  GetAuditStatusEnum({
                          commit, state
                        }) {
    return new Promise((resolve, reject) => {
      if (!(state.auditStatusEnum && state.auditStatusEnum.length > 0)) {
        getAuditStatusEnum().then(response => {
          commit('AUDIT_STATUS_ENUM', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 审批流程禁用状态
   */
  GetActivitiModelData({
                          commit, state
                        }) {
    return new Promise((resolve, reject) => {
      if (!(state.activitiModelData && state.activitiModelData.length > 0)) {
        GetActivitiModelData().then(response => {
          commit('ACTIVITI_MODEL_DATA', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 配送方式
   */
  GetAmTransportModeEnum({
                          commit, state
                        }) {
    return new Promise((resolve, reject) => {
      if (!(state.auditStatusEnum && state.amTransportModeEnum.length > 0)) {
        GetAmTransportModeEnum().then(response => {
          commit('AM_TRANSPORT_MODE_ENUM', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 单据来源类型
   */
  GetIncomeTypeEnum({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      if (!(state.incomeType && state.incomeType.length > 0)) {
        getIncomeTypeEnum().then(response => {
          commit('INCOMETYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 完工结算单据来源类型
   */
  GetBillTypeData({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      if (!(state.billType && state.billType.length > 0)) {
        getBillTypeData().then(response => {
          commit('BILL_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 应付查询来源类型
   */
  GetShouldPayOrderTypeData({
    commit, state
  }) {
    return new Promise((resolve, reject) => {
      if (!(state.shouldPayOrderType && state.shouldPayOrderType.length > 0)) {
        getShouldPayOrderTypeData().then(response => {
          commit('SHOWLD_PAY_ORDERTYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 有效状态
   */
  GetEnabledEnumSchedule({
                           commit, state
                         }) {
    return new Promise((resolve, reject) => {
      if (!(state.enableEnumSchedule && state.enableEnumSchedule.length > 0)) {
        GetEnabledEnumSchedule().then(response => {
          commit('ENABLE_ENUM_SCHEDULE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 启用/禁用
   */
  GetEnabledData({
                   commit, state
                 }) {
    return new Promise((resolve, reject) => {
      if (!(state.enabled && state.enabled.length > 0)) {
        getEnabledData().then(response => {
          commit('ENABLED', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 已签约/未签约
   */
  GetSiginStatusData({
                   commit, state
                 }) {
    return new Promise((resolve, reject) => {
      if (!(state.siginStatus && state.siginStatus.length > 0)) {
        GetSiginStatusData().then(response => {
          commit('SIGIN_STATUS', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 审批任务类型
   */
  GetAmTypeData({
                  commit, state
                }) {
    return new Promise((resolve, reject) => {
      if (!(state.amType && state.amType.length > 0)) {
        GetAmTypeData().then(response => {
          commit('AM_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 试用/租赁/永久
   */
  GetAuthData({
                commit, state
              }) {
    return new Promise((resolve, reject) => {
      if (!(state.auth && state.auth.length > 0)) {
        getAuthData().then(response => {
          commit('AUTH', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 注册用户/普通用户
   */
  GetUserTypeData({
                    commit, state
                  }) {
    return new Promise((resolve, reject) => {
      if (!(state.userType && state.userType.length > 0)) {
        getUserTypeData().then(response => {
          commit('USERTYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 是或否
   */
  GetIsOrNotData({
                   commit,
                   state
                 }) {
    return new Promise((resolve, reject) => {
      if (!(state.isOrNot && state.isOrNot.length > 0)) {
        getIsOrNotData().then(response => {
          commit('ISORNOT', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 男或女
   */
  GetGenderData({
                  commit, state
                }) {
    return new Promise((resolve, reject) => {
      if (!(state.gender && state.gender.length > 0)) {
        getGenderData().then(response => {
          commit('GENDER', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 组织机构类型
   */
  GetOrgTypeData({
                   commit, state
                 }) {
    return new Promise((resolve, reject) => {
      if (!(state.orgType && state.orgType.length > 0)) {
        getOrgTypeData().then(response => {
          commit('ORG_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 角色类型
   */
  GetRoleTypeData({
                    commit, state
                  }) {
    return new Promise((resolve, reject) => {
      if (!(state.roleType && state.roleType.length > 0)) {
        getRoleTypeData().then(response => {
          commit('ROLE_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 工作类型 离职 在职
   */
  GetJobStatusData({
                    commit, state
                  }) {
    return new Promise((resolve, reject) => {
      if (!(state.jobStatus && state.jobStatus.length > 0)) {
        getJobStatusData().then(response => {
          commit('JOB_STATUS', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 请假类型
   */
  GetHolidayTypeData({
                    commit, state
                  }) {
    return new Promise((resolve, reject) => {
      if (!(state.holidayType && state.holidayType.length > 0)) {
        getHolidayTypeData().then(response => {
          commit('HOLIDAT_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 是否阅读
   */
  GetReadStatus({
    commit, state
  }) {
  return new Promise((resolve, reject) => {
    if (!(state.readStatus && state.readStatus.length > 0)) {
      getReadStatus().then(response => {
      commit('READ_STATUS', response);
       resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
      }).catch(error => {
        reject(error)
      })
    },
     /**
   * 经营方式
   */
  GetOperate({
    commit, state
  }) {
  return new Promise((resolve, reject) => {
    if (!(state.operate && state.operate.length > 0)) {
      getOperateData().then(response => {
      commit('OPERATE', response);
       resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
      }).catch(error => {
        reject(error)
      })
    },
    /**
   * 变更类型
   */
  GetIfChange({
    commit, state
  }) {
  return new Promise((resolve, reject) => {
    if (!(state.ifchange && state.ifchange.length > 0)) {
      getIfchange().then(response => {
      commit('IFCHANGE', response);
       resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
      }).catch(error => {
        reject(error)
      })
    },

  /**
   * 分包结算单据来源类型
   * */
  GetSubFinBillTypeEnum({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.subFinBillType && state.subFinBillType.length > 0)) {
        getSubFinBillTypeEnum().then(response => {
          commit('SUB_FIN_BILL_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  GetOutTypeData({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.outType && state.outType.length > 0)) {
        GetOutTypeData().then(response => {
          commit('OUTTYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  GetInTypeData({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.inType && state.inType.length > 0)) {
        GetInTypeData().then(response => {
          commit('INTYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 采购结算单据来源类型
   * */
  GetPurchaseBillTypeEnum({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.purchaseBillType && state.purchaseBillType.length > 0)) {
        getPurchaseBillTypeEnum().then(response => {
          commit('PURCHASE_BILL_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  GetStockTypeData({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.stockType && state.stockType.length > 0)) {
        getStockTypeData().then(response => {
          commit('STOCK_TYPE', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
  /**
   * 成本管理 - 业务类型
   * */
  GetProIncomeTypeEnum({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.proIncomeTypeEnum && state.proIncomeTypeEnum.length > 0)) {
        getProIncomeTypeEnum().then(response => {
          commit('PRO_INCOME_TYPE_ENUM', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },

  /**
   * 成本管理 - 成本类型
   * */
  GetProCostTypeEnum({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.proCostTypeEnum && state.proCostTypeEnum.length > 0)) {
        getProCostTypeEnum().then(response => {
          commit('PRO_COST_TYPE_ENUM', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },
 /**
   * 成本管理 - 成本类型
   * */
 GetProCostBillTypeEnum({commit, state}) {
    return new Promise((resolve, reject) => {
      if (!(state.proCostBillTypeEnum && state.proCostBillTypeEnum.length > 0)) {
        getProCostBillTypeEnum().then(response => {
          commit('PRO_COST_BILL_TYPE_ENUM', response);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  },

  }




export default {
  state,
  getters,
  actions,
  mutations
}


