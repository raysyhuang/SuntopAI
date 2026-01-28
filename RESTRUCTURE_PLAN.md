# 页面重组计划

## 目标
重组网站页面结构，使内容分布更合理

## 变更内容

### Platform 页面
**添加：**
- Clinical Applications (从 Clinical 移来)
  - 中心内血液透析
  - 网络透析中心
  - 医生决策支持

**移除（移到 Deployment）：**
- Platform Architecture layers
- Partners section
- Differentiators/Why We Win

**保留：**
- Core Modules
- Monitoring System
- Cross Links

### Clinical 页面
**移除（移到 Platform）：**
- apps section (inCenter, networked, decision)
- beforeAfter labels
- aiRoleLabel
- statement section

**保留：**
- Fine Management 详细内容
- Gallery
- Cross Links

### Deployment 页面
**添加（从 Platform 移来）：**
- Platform Architecture
- Partners Section
- Differentiators/Why We Win

**保留：**
- Deployment features
- Process
- Security
- Supply Chain
- Cross Links
- CTA

### Company 页面
**添加（从 Contact 移来）：**
- Contact form
- Contact reasons
- Contact info
- Response time

**保留：**
- About us
- Mission/Vision
- Business Model
- Stats

### Contact 页面
**处理方式：**
- 可以重定向到 Company 页面的联系部分
- 或保留但简化为"联系我们"引导页

## 实施步骤
1. ✅ 创建测试分支
2. ⏳ 更新 zh-CN dictionary
3. ⏳ 更新组件代码
4. ⏳ 测试所有页面
5. ⏳ 如效果好，应用到其他语言

## 待更新的文件
- `/src/i18n/dictionaries/zh-CN.json`
- `/src/app/[locale]/platform/PlatformClient.tsx`
- `/src/app/[locale]/clinical/ClinicalClient.tsx`
- `/src/app/[locale]/deployment/DeploymentClient.tsx`
- `/src/app/[locale]/company/CompanyClient.tsx`
