<template>
  <el-dialog
    ref="attachmentChangeDom"
    title="上传附件"
    :visible.sync="dialogStatus"
    :modal-append-to-body="false"
    :limit="fileLimit"
    @closed="handleDialogClosed"
    width="500px"
  >
    <form-create v-model="formApi" :rule="formRules" :option="formOptions" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogClosed">取 消</el-button>
      <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  pmmEnclosure,
  getIPmmEnclosureBusinessSave
} from "api/project-module/api-project-attachment.js";
// 文件类型
export default {
  data() {
    return {
      formApi: null,
      formRules: [
        {
          type: "el-custom-select",
          title: "附件类型",
          field: "enclosureId",
          validate: this.formValidate({ required: true }),
          props: {
            params: {
              url: pmmEnclosure,
              data: {},
              labelKey: "dataContent",
              valueKey: "enclosureId"
            }
          }
        },
        {
          type: "el-custom-select",
          title: "合同所属",
          field: "",
          props: {
            params: {
              url: pmmEnclosure,
              data: {},
              labelKey: "dataContent",
              valueKey: "enclosureId"
            }
          }
        },
        {
          type: "el-custom-upload",
          title: "附件",
          field: "file",
          validate: this.formValidate({ required: true }),
          on: {
            "upload-complete": this.handleAttachUploadComplete
          }
        }
      ],
      formOptions: {
        form: { labelWidth: "85px" },
        submitBtn: { show: false }
      }
    };
  },
  props:{
    projectInfo:{
      type:Object,
      default:{}
    },
    file_info:{
      type:Object,
      default:{}
    },
    dialogStatus:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    file_info: {
      handler(newName, oldName) {
        this.handleUpload(newName);
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    // 上传
    handleUpload(file_info) {},
    // 上传成功
    handleDialogConfirm() {
      this.formApi.validate(valid => {
        if (valid) {
          this.formApi.el("file").submitUpload();
        }
      });
    },
    handleDialogClosed() {
      this.$emit("handleDialogClosed", false);
    },
    handleAttachUploadComplete() {
      const fileAddedIdList = this.formApi.el("file").fileAddedIdList;
      if (!fileAddedIdList.length) return this.$showToast("文件Id不允许为空！");
      const params = {
        dataType: this.file_info.dataType,
        enclosureId:
          this.formApi.getValue("enclosureId") || this.file_info.enclosureId,
        recordId: this.projectInfo.recordId,
        addFileId: fileAddedIdList
      };
      getIPmmEnclosureBusinessSave(params)
        .then(res => {
          this.$showToast("新增成功！", "success");
          this.$emit("iniFileData", {});
          this.handleDialogClosed();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
</style>
