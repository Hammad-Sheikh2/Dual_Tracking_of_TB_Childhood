export let data=[
    {
        id:1,
        frequency:1,
        Name:'Cough',
        Question:{
            English:'How severe was the cough today?',
            Urdu:'آج کھانسی کتنی شدید تھی؟'
        },
        Audio:{
            English:require('./audios/English/cough.mp3'),
            Urdu:require('./audios/Urdu/cough.mp3'),
        },
        Value:null,
        Icon: require('./Icons/cough.png'),
        Animation:require('./LottieFilesGIFs/dry-cough.gif'),
        SevereLabel:'Severe cough',
        MildLabel:'No cough',
        responseId:null
    },
    {
        id:2,
        frequency:1,
        Name:'Fever',
        Question:{
            English:'How severe was the fever today?',
            Urdu:'آج بخار کتنا شدید تھا؟'
        },
        Audio:{
            English:require('./audios/English/fever.mp3'),
            Urdu:require('./audios/Urdu/fever.mp3'),
        },
        Value:null,
        Icon:require('./Icons/fever.png'),
        Animation:require('./LottieFilesGIFs/fever.gif'),
        SevereLabel:'Severe fever',
        MildLabel:'No fever',
        responseId:null
    },
    {
        id:3,
        frequency:7,
        Name:'Cervical Lymph Nodes',
        Question:{
            English:'Have you noticed an increase in the size of the glands around the neck?',
            Urdu:'کیا آپ نے گردن کے گرد غدود کے سائز میں اضافہ دیکھا ہے؟'
        },
        Audio:{
            English:require('./audios/English/fever.mp3'),
            Urdu:require('./audios/Urdu/fever.mp3'),
        },
        Value:null,
        Icon:require('./Icons/fever.png'),
        Animation:require('./LottieFilesGIFs/fever.gif'),
        SevereLabel:'Double the size',
        MildLabel:'No increase',
        responseId:null
    },
    {
        id:4,
        frequency:1,
        Name:'Sweat',
        Question:{
            English:'How much did he/she sweat last night?',
            Urdu:'کل رات اس نے کتنا پسینہ بہایا؟'
        },
        Audio:{
            English:require('./audios/English/sweat.mp3'),
            Urdu:require('./audios/Urdu/sweat.mp3'),
        },
        Value:null,
        Icon:require('./Icons/sweat.png'),
        Animation:require('./LottieFilesGIFs/sweat.gif'),
        SevereLabel:'Profuse sweating',
        MildLabel:'No sweat',
        responseId:null
    },
    {
        id:5,
        frequency:7,
        Name:'Appetite',
        Question:{
            English:'How badly was the appetite of a child affected last week?',
            Urdu:'پچھلے ہفتے بچے کی بھوک کتنی بری طرح متاثر ہوئی؟'
        },
        Audio:{
            English:require('./audios/English/sweat.mp3'),
            Urdu:require('./audios/Urdu/sweat.mp3'),
        },
        Value:null,
        Icon:require('./Icons/sweat.png'),
        Animation:require('./LottieFilesGIFs/sweat.gif'),
        SevereLabel:'Full appetite',
        MildLabel:'No appetite',
        responseId:null
    },
    {
        id:6,
        frequency:7,
        Name:'Abdominal pain',
        Question:{
            English:'How badly a child experienced abdominal pain during the past week?',
            Urdu:'پچھلے ہفتے کے دوران ایک بچے کو پیٹ میں کتنی بری طرح درد ہوا؟'
        },
        Audio:{
            English:require('./audios/English/anxiety.mp3'),
            Urdu:require('./audios/Urdu/anxiety.mp3'),
        },
        Value:null,
        Icon:require('./Icons/anxiety.png'),
        Animation:require('./LottieFilesGIFs/anxiety.gif'),
        SevereLabel:'Severe abdominal pain',
        MildLabel:'No pain',
        responseId:null
    },
    {
        id:7,
        frequency:14,
        Name:'Weight gain',
        Question:{
            English:'How difficult was it for a kid to gain weight in past 15 days?',
            Urdu:'پچھلے 15 دنوں میں ایک بچے کے لیے وزن بڑھانا کتنا مشکل تھا؟'
        },
        Audio:{
            English:require('./audios/English/playfulness.mp3'),
            Urdu:require('./audios/Urdu/playfulness.mp3'),
        },
        Value:null,
        Icon:require('./Icons/playfulness.png'),
        Animation:require('./LottieFilesGIFs/playfulness.gif'),
        SevereLabel:'Not at all difficult',
        MildLabel:'Very difficult',
        responseId:null
    },
    {
        id:9,
        frequency:1,
        Name:'Anxiety',
        Question:{
            English:'How anxious was your child today?',
            Urdu:'آج آپ کا بچہ کتنا بے چین تھا؟'
        },
        Audio:{
            English:require('./audios/English/anxiety.mp3'),
            Urdu:require('./audios/Urdu/anxiety.mp3'),
        },
        Value:null,
        Icon:require('./Icons/anxiety.png'),
        Animation:require('./LottieFilesGIFs/anxiety.gif'),
        SevereLabel:'Very much anxious',
        MildLabel:'No anxious',
        responseId:null
    },
    {
        id:8,
        frequency:1,
        Name:'Playfulness',
        Question:{
            English:'How playful was your kid today?',
            Urdu:'آج آپ کا بچہ کتنا چنچل تھا؟'
        },
        Audio:{
            English:require('./audios/English/playfulness.mp3'),
            Urdu:require('./audios/Urdu/playfulness.mp3'),
        },
        Value:null,
        Icon:require('./Icons/playfulness.png'),
        Animation:require('./LottieFilesGIFs/playfulness.gif'),
        SevereLabel:'Not at all playful',
        MildLabel:'Very playful',
        responseId:null
    },
    {
        id:10,
        frequency:1,
        Name:'Sleep quality',
        Question:{
            English:'How was the quality of sleep last night?',
            Urdu:'کل رات نیند کا معیار کیسا رہا؟'
        },
        Audio:{
            English:require('./audios/English/sleep.mp3'),
            Urdu:require('./audios/Urdu/sleep.mp3'),
        },
        Value:null,
        Icon:require('./Icons/sleep.png'),
        Animation:require('./LottieFilesGIFs/sleep.gif'),
        SevereLabel:'Did not sleep well',
        MildLabel:'Slept very well',
        responseId:null
    },
    {
        id:11,
        frequency:1,
        Name:'Care burden',
        Question:{
            English:'How much of a burden did you feel today?',
            Urdu:'آج آپ نے کتنا بوجھ محسوس کیا؟'
        },
        Audio:{
            English:require('./audios/English/careBurden.mp3'),
            Urdu:require('./audios/Urdu/careBurden.mp3'),
        },
        Value:null,
        Icon:require('./Icons/caring.png'),
        Animation:require('./LottieFilesGIFs/caring.gif'),
        SevereLabel:'Very tired',
        MildLabel:'Not at all',
        responseId:null
    },
    {
        id:12,
        frequency:1,
        Name:'SHS',
        Question:{
           English:'How much your child was exposed to cigarette smoke today?',
            Urdu:'آج آپ کے بچے کو سگریٹ کے دھوئیں کا کتنا سامنا کرنا پڑا؟'
        },
        Audio:{
            English:require('./audios/English/shs.mp3'),
            Urdu:require('./audios/Urdu/shs.mp3'),
        },
        Value:null,
        Icon:require('./Icons/shs.png'),
        Animation:require('./LottieFilesGIFs/shs.gif'),
        SevereLabel:'Severely exposed',
        MildLabel:'Not at all',
        responseId:null
    },
    {
        id:13,
        frequency:1,
        Name:'Cooking fuel burning',
        Question:{
           English:'How much your child was exposed to cooking fuel burning today?',
            Urdu:'آج آپ کے بچے کو کھانا پکانے کا ایندھن جلانے کا کتنا سامنا کرنا پڑا؟'
        },
        Audio:{
            English:require('./audios/English/cooking.mp3'),
            Urdu:require('./audios/Urdu/cooking.mp3'),
        },
        Value:null,
        Icon:require('./Icons/cooking.png'),
        Animation:require('./LottieFilesGIFs/cooking.gif'),
        SevereLabel:'Severely exposed',
        MildLabel:'Not at all',
        responseId:null
    },
    {
        id:14,
        frequency:1,
        Name:'Traffic pollution',
        Question:{
           English:'How much your child was exposed to pollution caused by road traffic today?',
            Urdu:'آج آپ کا بچہ سڑک ٹریفک کی وجہ سے آلودگی کا کتنا شکار ہوا؟'
        },
        Audio:{
            English:require('./audios/English/traffic.mp3'),
            Urdu:require('./audios/Urdu/traffic.mp3'),
        },
        Value:null,
        Icon:require('./Icons/traffic.png'),
        Animation:require('./LottieFilesGIFs/traffic.gif'),
        SevereLabel:'Severely exposed',
        MildLabel:'Not at all',
        responseId:null
    },
    {
        id:15,
        frequency:7,
        Name:'Overall exposure',
        Question:{
           English:'How much your child was exposed to air pollutants last week?',
            Urdu:'پچھلے ہفتے آپ کا بچہ کتنا فضائی آلودگی کا شکار ہوا؟'
        },
        Audio:{
            English:require('./audios/English/traffic.mp3'),
            Urdu:require('./audios/Urdu/traffic.mp3'),
        },
        Value:null,
        Icon:require('./Icons/traffic.png'),
        Animation:require('./LottieFilesGIFs/traffic.gif'),
        SevereLabel:'Severely exposed',
        MildLabel:'Not at all',
        responseId:null
    }
]

export let Languages=[
    'English',
    'اُردُو'
]
