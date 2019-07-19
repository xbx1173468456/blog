/**
 * 除开枚举，数据字典的其他格式化数据
 */
export default {
  methods: {
    /**
     * 格式化日期，YYYY-MM-DD
     */
    formatDate(row, column, cellValue) {
      if (typeof row === 'string') {
        if (row) {
          return this.$utils.date.format(row);
        } else {
          return row;
        }
      } else if (typeof row === 'object') {
        if (row&&cellValue) {
          return this.$utils.date.format(cellValue);
        } else {
          return cellValue;
        }
      }
    },

    /**
     * 格式化年月，YYYY-MM
     */
    formatMonth(row, column, cellValue) {
      if (typeof row === 'string') {
        return this.$utils.date.format(row,'YYYY-MM');
      } else if (typeof row === 'object') {
        return this.$utils.date.format(cellValue,'YYYY-MM');
      }
    },

    /**
     * 格式化金钱2位
     */
    formatToThousands(row, column, cellValue) {
      if (typeof row === 'string' || typeof row === 'number') {
        return this.$utilsBasic.toThousands(row)
      } else if (typeof row === 'object') {
        return this.$utilsBasic.toThousands(cellValue)
      }
    },
    /**
     * 格式化金钱4位
     */
    formatToThousandsFour(row, column, cellValue) {
      if (typeof row === 'string' || typeof row === 'number') {
        return this.$utilsBasic.toThousands(row, 4)
      } else if (typeof row === 'object') {
        return this.$utilsBasic.toThousands(cellValue, 4)
      }
    },
    /**
     * 补零2位
     */
    formatToMoney(row, column, cellValue) {
      if (typeof row === 'string' || typeof row === 'number') {
        return this.$utilsBasic.toMoney(row)
      } else if (typeof row === 'object') {
        return this.$utilsBasic.toMoney(cellValue)
      }
    },
    /**
     * 补零4位
     */
    formatToMoneyFour(row, column, cellValue) {
      if (typeof row === 'string' || typeof row === 'number') {
        return this.$utilsBasic.toMoney(row, 4)
      } else if (typeof row === 'object') {
        return this.$utilsBasic.toMoney(cellValue, 4)
      }
    },
    /**
     * 收款账号格式化
     */
    formatMoeryCard(row, column, cellValue) {
      if (typeof row === 'string' || typeof row === 'number') {
        return this.$utilsBasic.moeryCard(row, 4)
      } else if (typeof row === 'object') {
        return this.$utilsBasic.moeryCard(cellValue, 4)
      }
    }
  }
}
