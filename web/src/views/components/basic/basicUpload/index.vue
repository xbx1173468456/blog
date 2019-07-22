<!--上传文件-->
<!--参考页面：src\views\sysManager\groupAuth\userManager\detail.vue-->
<template>
  <el-upload
    class="upload"
    ref="upload"
    name="file"
    :action="actionUrl"
    :on-progress="handleProgress"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-change="handleChange"
    :with-credentials="true"
    :file-list="fileListArray"
    :http-request="uploadFile"
    multiple
    :limit="10"
    accept="*/*"
    :data="uploadFileParams"
    :headers="myHeader"
    :auto-upload="false"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
    list-type="text">
    <el-button slot="trigger" size="small" type="primary" :disabled="disabled" icon="el-icon-if-upload">选择文件</el-button>
    <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>-->
    <el-button style="margin-left: 10px;" size="small" type="danger" @click="clickClearUpload" :disabled="disabled"
               icon="el-icon-if-clean">清空
    </el-button>
    <span slot="tip" class="el-upload__tip" v-if="!disabled">
      无法上传超过【20M】单文件或无法识别【.EXE】文件类型。
      <template name="tip"></template>
    </span>
  </el-upload>
</template>

<script>
  import {Message, MessageBox} from 'element-ui'
  import {startLoading, endLoading} from '@/utils/loading';
  import {getToken, getCookie} from '@/utils/auth'
  import {
    getAttacheFileData,
    clearAttacheFile,
    deleteAttacheFileById,
    postAttacheFiles
  } from '@/api/common/basic/basicUpload'
  import $ from 'jquery';

  export default {
    name: "basicUpload",
    props: {
      formId: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      //包含文件类型,排除和包含只能执行一个
      //isFileType:false,isFileTypeExclude:true
      isFileType: {
        type: Boolean,
        default: false
      },
      //是否需要排除文件类型
      //isFileType:false,isFileTypeExclude:true
      isFileTypeExclude: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentRow: undefined,
        modelSearchFilter: undefined,
        fileTypes: ['application/pdf', 'text/plain', 'image/jpeg', 'image/png', 'image/gif', '.rar', '.zip', '.xls', '.doc', '.ppt'],
        fileTypesExclude: ['.exe'],
        actionUrl: '/api/upload/sysAttacheFile/upload/',
        fileListArray: [],
        disabledClear: true,
        isUploadSuccess: true,
        uploadList: [],
        uploadFileParams: {id: "", type: 1},
        fileData: Function
      };
    },
    watch: {
      formId(value) {
        console.log('formId', value)
        if (!value) {
          this.fileListArray = [];
        } else {
          this.getAttacheFileData(this.formId);
        }
      }
    },
    computed: {
      myHeader() {
        const tokenValue = getToken()
        const authCode = getCookie('authCode')
        const sysUserId = getCookie('sysUserId')
        if (tokenValue) {
          return {
            "Authorization": tokenValue,
            "AuthCode": authCode,
            "SysUserId": sysUserId
          }
        }
      }
    },
    created() {
      if (this.formId) {
        this.getAttacheFileData(this.formId)
      }
    },
    methods: {
      handleProgress(event, file, fileList) {
        startLoading();
      },
      // handleBeforeRemove(file, fileList) {
      //   console.log('handleBeforeRemove', file, fileList);
      //   return this.$confirm(`确定移除【${ file.name }】文件吗？`,'提示',{ type: 'warning'});
      // },
      handleRemove(file, fileList) {
        this.deleteAttacheFileById(file, fileList);
      },
      handlePreview(file) {
        if (file.url) {
          window.open(file.url, '_blank');
        } else {
          this.$message({
            message: '文件地址不存在,可能未保存或服务器地址错误',
            type: 'warning'
          })
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择10个文件，本次选择了【${files.length}】个文件，共选择了【${files.length + fileList.length}】个文件`);
      },
      handleSuccess(response, file, fileList) {
        endLoading();
        this.getAttacheFileData(this.formId);
        console.log('handleSuccess', file, fileList);
        if (response.status && response.status !== 200) {
          this.$message({
            message: response.message,
            type: 'error'
          })
        }
      },
      handleError(err, file, fileList) {
        endLoading();
        console.log('handleError', file, fileList);
      },
      handleChange(file, fileList) {
        console.log('handleChange', file, fileList);
        this.fileListArray = fileList;
      },
      handleBeforeUpload(file) {
        let isFile = false;
        if (this.isFileTypeExclude) {
          //获得路径后缀
          let {name} = file;
          let lastIndex = name.lastIndexOf('.');
          const fileType = name.substr(lastIndex, name.length - lastIndex);
          isFile = !this.fileTypesExclude.includes(fileType.toLocaleLowerCase());
          if (!isFile) {
            console.log('handleBeforeUpload', `无法上传【${this.fileTypesExclude}】类型文件`);
            this.uploadList.push({message: `无法上传【${this.fileTypesExclude}】类型文件`,file});
          }
        }
        if (this.isFileType) {
          if (file.type) {
            isFile = this.fileTypes.includes(file.name);
          } else {
            //获得路径后缀
            let {name} = file;
            let lastIndex = name.lastIndexOf('.');
            const fileType = name.substr(lastIndex, name.length - lastIndex);
            isFile = this.fileTypes.includes(fileType);
          }
          if (!isFile) {
            console.log('handleBeforeUpload',`无法上传【${file.type}】类型文件!`);
            this.uploadList.push({message:`无法上传【${file.type}】类型文件!`,file});
          }
        }
        const isSize = file.size / 1024 / 1024 < 20;
        if (!isSize) {
          console.log('handleBeforeUpload', `无法上传超过【20MB】的文件!` + isSize);
          this.uploadList.push({message:'无法上传超过【20MB】的文件!',file});
        }
        this.isUploadSuccess = isFile && isSize;
        return this.isUploadSuccess;
      },
      getAttacheFileData(id) {
        if (this.$utils.length(id)) {
          getAttacheFileData({tableId: id, type: 1}).then((res) => {
            endLoading();
            this.fileListArray = [];
            if (!this.$utils.isEmpty(res.data)) {
              res.data.forEach((row) => {
                row.url = row.mainPath;
                this.fileListArray.push(row);
              })
              this.$nextTick(() => {
                this.disabledClear = false;
              })
            } else {
              this.$nextTick(() => {
                this.disabledClear = true;
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      async submitUpload(id) {
        this.fileData = new FormData();
        this.fileData.append('id', id);
        this.fileData.append('type', 1);
        this.uploadFileParams.id = id;
        this.$refs.upload.submit();
        if(this.$utils.length(this.uploadList)) {
          this.uploadList=[];
          this.$message.error(`上传失败：附件中包含超过【20M】单文件或无法识别的【.EXE】单文件！`);
          return false;
        }
        console.log(2)
        return await this.postAttacheFiles(id);
      },
      async postAttacheFiles(id) {
        return await new Promise((resolve, reject) => {
          if (this.$utils.length(id)) {
            let config = {
              //添加请求头
              headers: {"Content-Type": "multipart/form-data"},
              //添加上传进度监听事件
              onUploadProgress: e => {
                //var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
                //this.progress = completeProgress;
              }
            };
            console.log(3)
            postAttacheFiles(this.fileData, config).then((response) => {
              console.log(4)
              endLoading();
              if (response.status == 200) {
                this.getAttacheFileData(this.formId);
                resolve(true);
              }else{
                resolve(false);
              }
            }).catch((err) => {
              reject(false)
              console.log(err)
            })
          }
        })
      },
      clickClearUpload() {
        if (this.$utils.length(this.fileListArray) <= 0) {
          this.$message({
            message: '亲，无附件！',
            type: 'warning'
          })
          return;
        }
        this.$confirm('亲，您确定清空文件列表数据，清空后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.formId) {
              clearAttacheFile(this.formId).then((response) => {
                if (response.status === 200) {
                  this.$refs.upload.clearFiles();
                  this.disabledClear = true;
                  this.$message({
                    message: response.message,
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  })
                }
              })
            } else {
              this.fileListArray = [];
            }
          }, (cancel) => {
            console.log(cancel);
          })
      },
      deleteAttacheFileById(file, fileList) {
        if (this.$utils.length(file) && file.id) {
          deleteAttacheFileById(file.id).then((response) => {
            if (response.status === 200) {
              this.getAttacheFileData(this.formId);
              this.$message({
                message: response.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              })
            }
          })
        }
      },
      uploadFile: function (file) {
        this.fileData.append('file', file.file);
        //return this.handleBeforeUpload(file);
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .upload {
    padding: 10px 10px 0 10px;
    margin-left: -10px;
    .el-button {
      margin-bottom: 0;
    }
    span {
      margin-left: 10px
    }
    /deep/ .el-upload-list__item {
      width: 49%;
      background-color: #ecf5ff;
      float: left;
      margin-top: 10px;
      margin-left: 10px;
    }
    /deep/ .el-upload-list__item:nth-of-type(odd) {
      margin-top: 10px !important;
      margin-left: 0 !important;
    }
  }
</style>
