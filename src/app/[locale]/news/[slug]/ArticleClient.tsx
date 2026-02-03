'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft, Building2, Users, Heart, Utensils } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'
import { useTheme } from '@/components/ThemeProvider'

interface Article {
  slug: string
  date: string
  category: string
  image: string
}

interface ArticleClientProps {
  locale: Locale
  dictionary: Dictionary
  article: Article
}

// Article content by locale and slug
const articleContent: Record<string, Record<string, { title: string; summary: string; content: string[] }>> = {
  'kidney-care-event': {
    en: {
      title: 'Caring for Kidneys, Quality Dialysis | First Kidney Friend Association Event Successfully Concluded!',
      summary: 'The first Kidney Friend Association event at Zhongshan Shenkang brought together patients, families, and medical staff for an afternoon of education, sharing, and mutual support.',
      content: [
        'On January 15, 2026, Zhongshan Shenkang Dialysis Center successfully hosted its first Kidney Friend Association event, bringing together over 50 patients, their families, and our dedicated medical team.',
        'The event featured educational sessions on dialysis care, nutrition guidance from our expert dietitians, and interactive Q&A sessions where patients could ask questions directly to our nephrology specialists.',
        'Patients shared their personal experiences and coping strategies, creating a supportive community atmosphere. Many expressed how meaningful it was to connect with others who understand their journey.',
        'The event also included fun activities like health quizzes with prizes, light refreshments suitable for dialysis patients, and a photo booth to capture memorable moments.',
        'We are committed to continuing these community events to support our kidney friends and help them live fuller, healthier lives despite the challenges of dialysis treatment.',
      ]
    },
    ja: {
      title: '腎臓ケア・質の高い透析 | 第1回腎友会イベントが無事終了！',
      summary: '中山腎康での第1回腎友会イベントでは、患者、家族、医療スタッフが集まり、教育、共有、相互支援の午後を過ごしました。',
      content: [
        '2026年1月15日、中山腎康透析センターは第1回腎友会イベントを成功裏に開催し、50名以上の患者様、ご家族、そして献身的な医療チームが一堂に会しました。',
        'イベントでは透析ケアに関する教育セッション、専門栄養士による栄養指導、そして患者様が腎臓専門医に直接質問できるインタラクティブなQ&Aセッションが行われました。',
        '患者様は個人的な経験や対処法を共有し、支え合うコミュニティの雰囲気を作り出しました。多くの方が、同じ道のりを理解している他の方々とつながることの意義深さを表明されました。',
        'イベントには賞品付きの健康クイズ、透析患者様に適した軽食、思い出を残すフォトブースなどの楽しいアクティビティも含まれていました。',
        '私たちは腎友の皆様をサポートし、透析治療の課題にもかかわらず、より充実した健康的な生活を送っていただけるよう、このようなコミュニティイベントを継続して開催することをお約束します。',
      ]
    },
    'zh-CN': {
      title: '关爱肾脏 品质透析 | 首届肾友会圆满结束！',
      summary: '首届肾友会活动在中山肾康成功举办，患者、家属和医护人员共聚一堂，进行健康教育、经验分享和相互支持。',
      content: [
        '2026年1月15日，中山肾康血液透析中心成功举办首届肾友会活动，50多位患者、家属及医护团队欢聚一堂。',
        '活动包括透析护理知识讲座、专业营养师的饮食指导，以及患者与肾脏专家面对面的互动问答环节。',
        '肾友们分享了各自的治疗经历和应对方法，现场气氛温馨融洽。许多肾友表示，能与有相同经历的朋友交流，感到非常温暖和有意义。',
        '活动还设置了健康知识有奖问答、适合透析患者的精美茶点，以及留下美好回忆的拍照打卡区。',
        '我们将持续举办此类活动，为肾友们提供更多支持，帮助大家在透析治疗的同时，拥有更充实、更健康的生活。',
      ]
    },
    'zh-TW': {
      title: '關愛腎臟 品質透析 | 首屆腎友會圓滿結束！',
      summary: '首屆腎友會活動在中山腎康成功舉辦，患者、家屬和醫護人員共聚一堂，進行健康教育、經驗分享和相互支持。',
      content: [
        '2026年1月15日，中山腎康血液透析中心成功舉辦首屆腎友會活動，50多位患者、家屬及醫護團隊歡聚一堂。',
        '活動包括透析護理知識講座、專業營養師的飲食指導，以及患者與腎臟專家面對面的互動問答環節。',
        '腎友們分享了各自的治療經歷和應對方法，現場氣氛溫馨融洽。許多腎友表示，能與有相同經歷的朋友交流，感到非常溫暖和有意義。',
        '活動還設置了健康知識有獎問答、適合透析患者的精美茶點，以及留下美好回憶的拍照打卡區。',
        '我們將持續舉辦此類活動，為腎友們提供更多支持，幫助大家在透析治療的同時，擁有更充實、更健康的生活。',
      ]
    },
  },
  'summer-foods-dialysis': {
    en: {
      title: 'Are Common Summer Foods Suitable for Dialysis Patients?',
      summary: 'Our nutrition experts share guidance on which refreshing summer foods are safe and beneficial for dialysis patients, and which ones to avoid.',
      content: [
        'Summer brings a variety of refreshing foods and drinks, but dialysis patients need to be mindful of their dietary choices. Our nutrition experts have compiled this guide to help you make informed decisions.',
        'Watermelon, while refreshing, is high in potassium and water content. Dialysis patients should limit consumption to small portions and account for the fluid intake in their daily allowance.',
        'Mung bean soup is a traditional summer cooling food in China. However, it\'s relatively high in potassium and phosphorus. If you want to enjoy it, limit to half a bowl and reduce other high-potassium foods that day.',
        'Ice cream and cold drinks may seem appealing, but they often contain high amounts of phosphorus additives and sugar. Opt for homemade frozen fruit treats with controlled ingredients instead.',
        'Fresh vegetables like cucumbers and lettuce are generally safe options. They can help you feel refreshed while providing necessary fiber. Just remember to account for the water content.',
        'Always consult with your dialysis center\'s nutritionist before making significant dietary changes. They can provide personalized advice based on your specific health conditions and lab results.',
      ]
    },
    ja: {
      title: '一般的な夏の食べ物は透析患者に適していますか？',
      summary: '栄養専門家が、透析患者にとって安全で有益な夏の爽やかな食べ物と、避けるべきものについてガイダンスを共有します。',
      content: [
        '夏には様々な爽やかな食べ物や飲み物がありますが、透析患者は食事の選択に注意が必要です。当センターの栄養専門家がこのガイドを作成しました。',
        'スイカは爽やかですが、カリウムと水分が多く含まれています。透析患者は少量に制限し、1日の水分摂取量に含めて計算してください。',
        '緑豆スープは中国の伝統的な夏の涼しい食べ物です。しかし、カリウムとリンが比較的多く含まれています。楽しみたい場合は、半分のボウルに制限し、その日の他の高カリウム食品を減らしてください。',
        'アイスクリームや冷たい飲み物は魅力的に見えますが、多くの場合リン添加物や砂糖が多く含まれています。代わりに、材料を管理した自家製の冷凍フルーツを選んでください。',
        'キュウリやレタスなどの新鮮な野菜は一般的に安全な選択肢です。必要な食物繊維を提供しながら、爽やかな気分になれます。水分含有量を計算することを忘れないでください。',
        '重要な食事の変更を行う前に、必ず透析センターの栄養士に相談してください。あなたの特定の健康状態と検査結果に基づいた個別のアドバイスを提供できます。',
      ]
    },
    'zh-CN': {
      title: '常见的消暑食品适不适合透析人群？',
      summary: '我们的营养专家分享了哪些清凉消暑食品对透析患者安全有益，以及应该避免哪些食品的指导建议。',
      content: [
        '夏季有各种清凉解暑的食品和饮料，但透析患者需要注意饮食选择。我们的营养专家为您整理了这份指南。',
        '西瓜虽然清爽解渴，但钾和水分含量较高。透析患者应限制食用量，并将水分摄入计入每日限额。',
        '绿豆汤是中国传统的消暑佳品，但其钾和磷含量相对较高。如果想食用，建议控制在半碗以内，并相应减少当天其他高钾食物的摄入。',
        '冰淇淋和冷饮虽然诱人，但通常含有较高的磷添加剂和糖分。建议选择自制的、成分可控的冷冻水果代替。',
        '黄瓜、生菜等新鲜蔬菜通常是安全的选择。它们能让您感到清爽，同时提供必要的膳食纤维。但要注意计算其水分含量。',
        '在进行重大饮食调整前，请务必咨询透析中心的营养师。他们可以根据您的具体健康状况和化验结果，提供个性化的建议。',
      ]
    },
    'zh-TW': {
      title: '常見的消暑食品適不適合透析人群？',
      summary: '我們的營養專家分享了哪些清涼消暑食品對透析患者安全有益，以及應該避免哪些食品的指導建議。',
      content: [
        '夏季有各種清涼解暑的食品和飲料，但透析患者需要注意飲食選擇。我們的營養專家為您整理了這份指南。',
        '西瓜雖然清爽解渴，但鉀和水分含量較高。透析患者應限制食用量，並將水分攝入計入每日限額。',
        '綠豆湯是中國傳統的消暑佳品，但其鉀和磷含量相對較高。如果想食用，建議控制在半碗以內，並相應減少當天其他高鉀食物的攝入。',
        '冰淇淋和冷飲雖然誘人，但通常含有較高的磷添加劑和糖分。建議選擇自製的、成分可控的冷凍水果代替。',
        '黃瓜、生菜等新鮮蔬菜通常是安全的選擇。它們能讓您感到清爽，同時提供必要的膳食纖維。但要注意計算其水分含量。',
        '在進行重大飲食調整前，請務必諮詢透析中心的營養師。他們可以根據您的具體健康狀況和化驗結果，提供個性化的建議。',
      ]
    },
  },
  'dragon-boat-festival': {
    en: {
      title: 'A Ceremonial Dragon Boat Festival at Xingkang Dialysis Center!',
      summary: 'Xingkang Blood Dialysis Center celebrated Dragon Boat Festival with traditional activities, zongzi making, and heartwarming moments with our kidney friends.',
      content: [
        'The Dragon Boat Festival, also known as Duanwu Festival, is one of China\'s most important traditional holidays. This year, Xingkang Blood Dialysis Center organized a special celebration for our patients and staff.',
        'The highlight of the event was the zongzi (sticky rice dumpling) making activity. Our medical staff and patients worked together to wrap traditional zongzi, sharing techniques and stories behind this ancient custom.',
        'For our dialysis patients, we prepared special low-sodium, low-potassium versions of zongzi, ensuring everyone could safely enjoy the festive treats. Our nutritionists carefully supervised the ingredient selection.',
        'The center was decorated with traditional sachets, colorful threads, and pictures of dragon boats, creating a festive atmosphere that lifted everyone\'s spirits. Patients received handmade blessing sachets as gifts.',
        'Events like these are important for our kidney friends\' emotional wellbeing. We believe that maintaining connections to cultural traditions and community helps patients cope better with their treatment journey.',
        'We thank all the patients and families who participated and look forward to more festive celebrations together!',
      ]
    },
    ja: {
      title: '杏康透析センターでの端午の節句！',
      summary: '杏康血液透析センターは、伝統的な活動、粽作り、腎友との心温まるひとときで端午の節句を祝いました。',
      content: [
        '端午の節句は中国で最も重要な伝統的な祝日の一つです。今年、杏康血液透析センターは患者様とスタッフのために特別なお祝いを企画しました。',
        'イベントのハイライトは粽（ちまき）作り体験でした。医療スタッフと患者様が一緒に伝統的な粽を作り、この古代の習慣にまつわる技術や物語を共有しました。',
        '透析患者様のために、低ナトリウム・低カリウムの特別な粽を用意し、全員が安全にお祝いの食べ物を楽しめるようにしました。栄養士が材料の選択を慎重に監督しました。',
        'センターは伝統的な香袋、カラフルな糸、龍船の絵で飾られ、皆の気持ちを高揚させるお祭りの雰囲気を作り出しました。患者様には手作りの祝福の香袋がプレゼントされました。',
        'このようなイベントは腎友の皆様の精神的な健康にとって重要です。文化的伝統やコミュニティとのつながりを維持することが、患者様の治療の道のりをより良く乗り越える助けになると信じています。',
        '参加してくださった全ての患者様とご家族に感謝し、今後もより多くのお祝いを一緒に楽しみにしています！',
      ]
    },
    'zh-CN': {
      title: '充满仪式感的端午节，杏康血液透析中心太给力啦！',
      summary: '杏康血液透析中心与肾友们一起庆祝端午节，包粽子、做手工，共度温馨美好的节日时光。',
      content: [
        '端午节是中国最重要的传统节日之一。今年，杏康血液透析中心为患者和员工精心组织了一场特别的庆祝活动。',
        '活动的亮点是包粽子体验。医护人员与肾友们一起动手包粽子，分享包粽子的技巧和端午节的传统故事。',
        '为了让透析患者也能安全地享受节日美食，我们特别准备了低盐低钾的健康粽子。营养师全程监督食材的选择和制作。',
        '中心布置了传统的香囊、五彩绳、龙舟图案等装饰，营造出浓浓的节日氛围，让每位肾友都感受到节日的温暖。大家还收到了精心制作的祝福香囊作为礼物。',
        '这样的活动对肾友们的身心健康非常重要。我们相信，保持与传统文化和社区的联系，能帮助患者更好地面对治疗过程中的挑战。',
        '感谢所有参与活动的肾友和家属，期待与大家共度更多美好的节日时光！',
      ]
    },
    'zh-TW': {
      title: '充滿儀式感的端午節，杏康血液透析中心太給力啦！',
      summary: '杏康血液透析中心與腎友們一起慶祝端午節，包粽子、做手工，共度溫馨美好的節日時光。',
      content: [
        '端午節是中國最重要的傳統節日之一。今年，杏康血液透析中心為患者和員工精心組織了一場特別的慶祝活動。',
        '活動的亮點是包粽子體驗。醫護人員與腎友們一起動手包粽子，分享包粽子的技巧和端午節的傳統故事。',
        '為了讓透析患者也能安全地享受節日美食，我們特別準備了低鹽低鉀的健康粽子。營養師全程監督食材的選擇和製作。',
        '中心布置了傳統的香囊、五彩繩、龍舟圖案等裝飾，營造出濃濃的節日氛圍，讓每位腎友都感受到節日的溫暖。大家還收到了精心製作的祝福香囊作為禮物。',
        '這樣的活動對腎友們的身心健康非常重要。我們相信，保持與傳統文化和社區的聯繫，能幫助患者更好地面對治療過程中的挑戰。',
        '感謝所有參與活動的腎友和家屬，期待與大家共度更多美好的節日時光！',
      ]
    },
  },
  'binzhou-center-opening': {
    en: {
      title: 'Walking Together for Kidney Health — Binzhou Xingkang Dialysis Center Now Open!',
      summary: 'We are excited to announce the grand opening of Binzhou Xingkang Blood Dialysis Center, bringing advanced dialysis care to more patients in the region.',
      content: [
        'On October 18, 2025, Binzhou Xingkang Blood Dialysis Center officially opened its doors, marking another milestone in our mission to bring quality dialysis care to patients across China.',
        'The new center is equipped with state-of-the-art dialysis machines and water treatment systems, ensuring the highest standards of treatment quality and patient safety.',
        'Our experienced medical team includes certified nephrologists, specialized dialysis nurses, and dedicated support staff, all committed to providing compassionate, personalized care.',
        'The center features comfortable treatment stations with individual entertainment systems, a bright and welcoming environment designed to make dialysis sessions as comfortable as possible.',
        'Local government officials and healthcare leaders attended the opening ceremony, expressing support for our efforts to improve healthcare access in the region.',
        'We are honored to serve the Binzhou community and look forward to becoming a trusted partner in our patients\' health journey. Welcome to the Xingkang family!',
      ]
    },
    ja: {
      title: '腎臓の健康のために共に歩む — 滨州杏康透析センターオープン！',
      summary: '滨州杏康血液透析センターのグランドオープンを発表できることを嬉しく思います。この地域のより多くの患者に先進的な透析ケアを提供します。',
      content: [
        '2025年10月18日、滨州杏康血液透析センターが正式にオープンし、中国全土の患者に質の高い透析ケアを提供するという私たちの使命において、また一つの節目を迎えました。',
        '新センターには最先端の透析機器と水処理システムが装備されており、最高水準の治療品質と患者の安全を確保しています。',
        '経験豊富な医療チームには、認定腎臓専門医、専門透析看護師、献身的なサポートスタッフが含まれ、全員が思いやりのある個別ケアの提供に尽力しています。',
        'センターには個別のエンターテイメントシステムを備えた快適な治療ステーションがあり、透析セッションをできるだけ快適にするために設計された明るく歓迎的な環境が特徴です。',
        '開所式には地方政府関係者や医療リーダーが出席し、地域の医療アクセス向上に対する私たちの取り組みへの支持を表明しました。',
        '滨州コミュニティに貢献できることを光栄に思い、患者様の健康の旅において信頼できるパートナーになることを楽しみにしています。杏康ファミリーへようこそ！',
      ]
    },
    'zh-CN': {
      title: '携手共"净" 肾爱同行——滨州杏康血液透析中心正式开诊啦！',
      summary: '滨州杏康血液透析中心盛大开业，为更多肾友带来先进的透析医疗服务，守护肾友健康。',
      content: [
        '2025年10月18日，滨州杏康血液透析中心正式开业，这是我们为中国各地患者提供优质透析服务使命中的又一重要里程碑。',
        '新中心配备了先进的透析设备和水处理系统，确保最高标准的治疗质量和患者安全。',
        '我们经验丰富的医疗团队包括认证肾脏专家、专业透析护士和专职支持人员，全体成员致力于提供贴心、个性化的医疗服务。',
        '中心设有舒适的治疗区，配备独立娱乐系统，明亮温馨的环境设计让透析过程尽可能舒适。',
        '开业典礼上，当地政府官员和医疗界领导出席并致辞，对我们改善区域医疗服务可及性的努力表示支持。',
        '我们很荣幸能够服务滨州社区，期待成为肾友们健康之路上值得信赖的伙伴。欢迎加入杏康大家庭！',
      ]
    },
    'zh-TW': {
      title: '攜手共"淨" 腎愛同行——濱州杏康血液透析中心正式開診啦！',
      summary: '濱州杏康血液透析中心盛大開業，為更多腎友帶來先進的透析醫療服務，守護腎友健康。',
      content: [
        '2025年10月18日，濱州杏康血液透析中心正式開業，這是我們為中國各地患者提供優質透析服務使命中的又一重要里程碑。',
        '新中心配備了先進的透析設備和水處理系統，確保最高標準的治療質量和患者安全。',
        '我們經驗豐富的醫療團隊包括認證腎臟專家、專業透析護士和專職支持人員，全體成員致力於提供貼心、個性化的醫療服務。',
        '中心設有舒適的治療區，配備獨立娛樂系統，明亮溫馨的環境設計讓透析過程盡可能舒適。',
        '開業典禮上，當地政府官員和醫療界領導出席並致辭，對我們改善區域醫療服務可及性的努力表示支持。',
        '我們很榮幸能夠服務濱州社區，期待成為腎友們健康之路上值得信賴的夥伴。歡迎加入杏康大家庭！',
      ]
    },
  },
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  event: Heart,
  health: Utensils,
  deployment: Building2,
}

const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString)
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'ja': 'ja-JP',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
  }
  return date.toLocaleDateString(localeMap[locale] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ArticleClient({ locale, dictionary, article }: ArticleClientProps) {
  const { theme } = useTheme()
  const t = dictionary.news
  
  const content = articleContent[article.slug]?.[locale] || articleContent[article.slug]?.en
  const Icon = categoryIcons[article.category] || Users
  
  if (!content) {
    return <div>Article not found</div>
  }

  return (
    <div className="relative pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={article.image}
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <Link 
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.tag || 'Back to News'}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/90 text-sm uppercase tracking-wider">{article.category}</span>
              <span className="text-white/60">•</span>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date, locale)}
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              {content.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section 
        className="py-16"
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xl leading-relaxed mb-8 pb-8 border-b ${
              theme === 'dark' ? 'text-gray-300 border-slate-700' : 'text-gray-700 border-gray-200'
            }`}
          >
            {content.summary}
          </motion.p>

          {/* Content paragraphs */}
          <div className="space-y-6">
            {content.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-base leading-relaxed ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t"
            style={{ borderColor: theme === 'dark' ? 'rgb(51,65,85)' : 'rgb(229,231,235)' }}
          >
            <Link 
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: '#007d73' }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.allUpdates || 'Back to All News'}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
