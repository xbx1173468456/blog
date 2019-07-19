/**
 * 表格格式化枚举
 */
export default {
  methods: {
    /**
     * 是否主岗岗位
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfMainDuty(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifMainDuty) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否是操作员
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfOperate(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifOperate) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否是管理员
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIsAdmin(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.isAdmin) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },

    /**
     * 是否是投标
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIsTender(row) {
      let name = '未知';

      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.date) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否生成合同
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfInviteBid(row) {
      console.log(row.ifInviteBid)
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifInviteBid) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },/**
     * 是否招标
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfContract(row) {
      let name = '未知';

      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifContract) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否结算
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatIfPay(row) {
      let name = '未知';

      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifPay) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 男和女
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatSex(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.gender) {
        if (resultObj.code == row.sex || resultObj.code == row.gender || resultObj.code == row.personGender) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 启用和禁用
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatEnable(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.enabled) {
        if (resultObj.code == row.enable) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 未审核/已审核
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatValidateStatus(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.validateStatus) {
        if (resultObj.code == row.validateStatus) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 角色类型，角色和类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatRoleType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.roleType) {
        if (resultObj.code == row.roleType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 在职 / 离职
     */
    formatJobStatus(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.jobStatus) {
        if (resultObj.code == row.status) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 请假类型
     */
    formatHolidayType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.holidayType) {
        if (resultObj.code == row.type) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 机构/部门/岗位
     */
    formatType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.type) {
        if (resultObj.code == row.type) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 阅读状态
     */
    formatReadStatus(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.readStatus) {
        if (resultObj.code == row.readStatus) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否末级
     */
    formatIfLastLevel(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == row.ifLastLevel) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否
     */
    formatIsOrNot(val) {
      let name = '否';
      for (const resultObj of this.dataEnum.isOrNot) {
        if (resultObj.code == val) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 审批流程状态
     */
    formatAuditStatusEnum(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.auditStatusEnum) {
        if (resultObj.code == val.validateStatus) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 是否有效
     */
    formatEnabledEnumSchedule(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.enableEnumSchedule) {
        if (resultObj.code == val) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 分包结算单据来源类型
     * */
    formatSubFinBillType(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.subFinBillType) {
        if (resultObj.code == val.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 分包结算单据来源类型
     * */
    formatPurchaseBillType(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.purchaseBillType) {
        if (resultObj.code == val.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 完工结算单据来源类型
     * */
    formatBillType(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.billType) {
        if (resultObj.code == val.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    //出库类型
    formatOutType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.outType) {
        if (resultObj.code == row.outType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    //入库类型
    formatInType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.inType) {
        if (resultObj.code == row.inType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    //任务类型
    formatAmType(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.amType) {
        if (resultObj.code == val) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    // 单位类型
    formatUseEnterpriseType1(val) {
      let name = '未知';
      for (const resultObj of this.dataEnum.useEnterpriseType) {
        if (resultObj.code == val) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    //审批类型
    formatAuditStatusEnum(val) {
      val = typeof val == 'object' ? val.validateStatus : val
      let name = '未知';
      for (const resultObj of this.dataEnum.auditStatusEnum) {
        if (resultObj.code == val) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    //库存入库类型
    formatStockTypeEnum(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.stockType) {
        if (resultObj.code == row.inType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     * 领用单位类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatUseEnterpriseType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.static.useEnterpriseType) {
        if (resultObj.code == row.useEnterpriseType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },

    /**
     *  成本管理 - 业务类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatProIncomeType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.proIncomeTypeEnum) {
        if (resultObj.code == row.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     *  成本管理 - 成本类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatProCostType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.proCostTypeEnum) {
        if (resultObj.code == row.costType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
    /**
     *  成本管理 - 成本单据类型
     * @param row 当前行
     * @returns {string} 返回中文
     */
    formatProCostBillType(row) {
      let name = '未知';
      for (const resultObj of this.dataEnum.proCostBillTypeEnum) {
        if (resultObj.code == row.billType) {
          name = resultObj.name;
          break;
        }
      }
      return name;
    },
  }
}
