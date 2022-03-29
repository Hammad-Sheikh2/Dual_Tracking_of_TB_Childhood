export let data=[
    {
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
        MildLabel:'No cough'
    },
    {
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
        MildLabel:'No fever'
    },
    {
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
        MildLabel:'No sweat'
    },
    {
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
        MildLabel:'No anxious'
    },
    {
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
        MildLabel:'Very playful'
    },
    {
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
        MildLabel:'Slept very well'
    },
    {
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
        MildLabel:'Not at all'
    },
    {
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
        MildLabel:'Not at all'
    },
    {
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
        MildLabel:'Not at all'
    },
    {
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
        MildLabel:'Not at all'
    }
]

export let Languages=[
    'English',
    'اُردُو'
]
