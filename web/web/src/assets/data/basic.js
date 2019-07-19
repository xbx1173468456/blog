/**
 * 使用该文件条件：后端自定义枚举数据，未通过API能获取数据Enum
 * 或多个地方使用静态数据就使用该文件定义对应静态数据
 */
export const staticDataBasic = {
  //管理员类型
  groupType: '1',
  //用户类型
  userType: [{
    code: '1',
    name: '注册用户'
  },
    {
      code: '2',
      name: '普通用户'
    }],
  info:{
    registerInfo:'亲，注册成功，继续跳转到登录页面',
    delete:'亲，您是否确定删除当前数据，删除后数据不能恢复！',
    audit:'亲，您是否确定审核当前数据，审核后数据不能修改!',
    disEnable:'亲，您是否确定禁用当前数据，禁用后数据不能使用',
    enable:'亲，您是否确定启用当前数据，启用后数据即可使用！',
    auditDelete: '亲，您是否确定审核当前数据，审核后数据不能删除！',
    signingUpdate: '亲，您是否确定当前合同已签约，确定后数据不能修改！',
    updateEmpty: '亲，未修改任何数据！',
    updateEmptyError: '亲，请先完善和修正错误数据！',
    dataCleanError: '亲，您是否确定清理数据，数据清理后不能恢复！',
    dataInitError: '亲，您是否确定初始化数据，数据初始化后不能恢复！',
    canOverflowWorkFlow:'亲，是否可配审批流程为【否】，无法进行配置工作流程，如需配置需要联系管理员！',
    configWorkFlow:'亲，您是否配置当前工作流程，配置后工作流程即可使用！',
    shouldPayScale:'亲，应付进度款比例必须大于等于0.00，且小于1.00',
    qualityAssuranceScale:'亲，质保金比例必须大于等于0.00，且小于1.00',
    progressPricePayScale:'亲，进度款支付比例必须大于等于0.00，且小于1.00',
    invoiceTaxRate:'亲，发票税率必须大于等于0.00，且小于1.00',
    inOut:'亲，请先引入【采购入库单】或【直进直出单】！',
  }
}
