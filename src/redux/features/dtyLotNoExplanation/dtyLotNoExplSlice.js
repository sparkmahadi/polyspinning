import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLot: '',
    explainedLot: {},
};

const chipsCode = [
    {name: "Direct", Code: "00"},
    {name: "CMFC", Code: "11"},
    {name: "Fuzian Jinlun", Code: "02"},
    {name: "Indorama", Code: "03"},
    {name: "Recron", Code: "04"},
    {name: "Hunvira", Code: "05"},
    {name: "PT.Sulindafin", Code: "06"},
    {name: "Xiaman Xianglu", Code: "07"},
    {name: "Eslon", Code: "08"},
    {name: "Chung Sing", Code: "09"},
    {name: "Tairilin", Code: "10"},
    {name: "Huvis", Code: "11"},
    {name: "Jade", Code: "12"},
    {name: "Gatronova", Code: "13"},
    {name: "Toplon", Code: "14"},
    {name: "Modern Syntex Ltd", Code: "15"},
    {name: "Nanlon", Code: "16"},
    {name: "Garden", Code: "17"},
    {name: "Zhejiang Hengyi", Code: "18"},
    {name: "Jiangsu", Code: "19"},
    {name: "Wankai", Code: "20"},
    {name: "Lealea", Code: "21"},
];

const ProductCode = [
    { ProductType: "30/1/NIM", Code: "00" },
    { ProductType: "50/24/NIM", Code: "01" },
    { ProductType: "50/24/SIM", Code: "02" },
    { ProductType: "50/24/SD", Code: "03" },
    { ProductType: "50/36/Br", Code: "04" },
    { ProductType: "50/24/HIM", Code: "05" },
    { ProductType: "68/24/SD", Code: "06" },
    { ProductType: "75/36/NIM", Code: "07" },
    { ProductType: "75/36/HIM", Code: "08" },
    { ProductType: "75/36/Br", Code: "09" },
    { ProductType: "75/36/SD", Code: "10" },
    { ProductType: "75/36/SIM", Code: "11" },
    { ProductType: "50/36/HIM", Code: "12" },
    { ProductType: "75/72/SIM", Code: "13" },
    { ProductType: "75/72/NIM", Code: "14" },
    { ProductType: "75/72/HIM", Code: "15" },
    { ProductType: "75/96/SIM", Code: "16" },
    { ProductType: "75/48/NIM", Code: "17" },
    { ProductType: "75/144/HIM", Code: "18" },
    { ProductType: "75/144/SIM", Code: "19" },
    { ProductType: "100/36/NIM", Code: "20" },
    { ProductType: "100/36/HIM", Code: "21" },
    { ProductType: "100/36/LIM", Code: "22" },
    { ProductType: "100/36/SIM", Code: "23" },
    { ProductType: "100/96/LIM", Code: "24" },
    { ProductType: "100/96/SIM", Code: "25" },
    { ProductType: "100/144/HIM", Code: "26" },
    { ProductType: "100/144/SIM", Code: "27" },
    { ProductType: "108/36/Br", Code: "28" },
    { ProductType: "150/36/Br", Code: "29" },
    { ProductType: "150/36/SD", Code: "30" },
    { ProductType: "150/48/NIM", Code: "31" },
    { ProductType: "150/48/HIM", Code: "32" },
    { ProductType: "150/48/SIM", Code: "33" },
    { ProductType: "150/48/LIM", Code: "34" },
    { ProductType: "150/48/Br", Code: "35" },
    { ProductType: "150/96/NIM", Code: "36" },
    { ProductType: "150/96/HIM", Code: "37" },
    { ProductType: "150/96/LIM", Code: "38" },
    { ProductType: "150/96/SIM", Code: "39" },
    { ProductType: "150/144/NIM", Code: "40" },
    { ProductType: "150/144/HIM", Code: "41" },
    { ProductType: "150/144/SIM", Code: "42" },
    { ProductType: "200/96/NIM", Code: "43" },
    { ProductType: "200/96/HIM", Code: "44" },
    { ProductType: "220/72/HIM", Code: "45" },
    { ProductType: "220/288/HIM", Code: "46" },
    { ProductType: "300/96/NIM", Code: "47" },
    { ProductType: "300/96/HIM", Code: "48" },
    { ProductType: "220/96/NIM", Code: "49" },
    { ProductType: "300/96/SIM", Code: "50" },
    { ProductType: "300/96/Br", Code: "51" },
    { ProductType: "150/108/HIM", Code: "52" },
    { ProductType: "450/96/Br", Code: "53" },
    { ProductType: "empty", Code: "54" },
    { ProductType: "450/144/HIM", Code: "55" },
    { ProductType: "150/72/HIM", Code: "56" },
    { ProductType: "600/192/HIM", Code: "57" },
    { ProductType: "600/144/Br", Code: "58" },
    { ProductType: "150/ Mélange", Code: "59" },
    { ProductType: "empty", Code: "60" },
    { ProductType: "empty", Code: "61" },
    { ProductType: "108/36/SD", Code: "62" },
    { ProductType: "empty", Code: "63" },
    { ProductType: "200/144/SIM", Code: "64" },
    { ProductType: "50/36/NIM", Code: "65" },
    { ProductType: "200/144/NIM", Code: "66" },
    { ProductType: "220/144/HIM", Code: "67" },
    { ProductType: "100/48/NIM", Code: "68" },
    { ProductType: "150/84/HIM", Code: "69" },
    { ProductType: "600/192/SIM", Code: "70" },
    { ProductType: "empty", Code: "71" },
    { ProductType: "empty", Code: "72" },
    { ProductType: "empty", Code: "73" },
    { ProductType: "100+40 ACY", Code: "74" },
    { ProductType: "75+40 ACY", Code: "75" },
    { ProductType: "75+70 ACY", Code: "76" },
    { ProductType: "empty", Code: "77" },
    { ProductType: "empty", Code: "78" },
    { ProductType: "empty", Code: "79" },
    { ProductType: "empty", Code: "80" },
    { ProductType: "150+40 ACY", Code: "81" },
    { ProductType: "150+70 ACY", Code: "82" },
    { ProductType: "empty", Code: "83" },
    { ProductType: "empty", Code: "84" },
    { ProductType: "empty", Code: "85" },
    { ProductType: "100/96/NIM", Code: "86" },
    { ProductType: "empty", Code: "87" },
    { ProductType: "300+40 ACY", Code: "88" },
    { ProductType: "200+40 ACY", Code: "89" },
    { ProductType: "200+70 ACY", Code: "90" },
    { ProductType: "empty", Code: "91" },
    { ProductType: "300+70 ACY", Code: "92" },
    { ProductType: "empty", Code: "93" },
    { ProductType: "empty", Code: "94" },
    { ProductType: "empty", Code: "95" },
    { ProductType: "450+40 ACY", Code: "96" },
    { ProductType: "empty", Code: "97" },
    { ProductType: "empty", Code: "98" }
];

const PdWiseCode = [
    "POY",
    "DTY SD RW",
    "DTY DD, MELANGE,FD",
    "DTY SBr ",
    " ACY, BCY",
    "FDY SBr",
    "FDY SD RW",
    "FDY DD, MELANGE,FD",
]

const intTypeCode = [
    "NIM",
    "HIM",
    "SIM",
    "LIM",
    "Pulsar",
]

function findDFFromCode(code) {
    const foundDF = ProductCode.find(item => item.Code === code);
    return foundDF ? foundDF.ProductType : "ProductType not found";
}

function findChipsFromCode(code) {
    const foundChips = chipsCode.find(item => item.Code === code);
    return foundChips ? foundChips.name : "Chips not found";
}

const dtyLotNoExplSlice = createSlice({
    name: "dtyLotNoExplanation",
    initialState,
    reducers: {
        setExplainedLot: (state, action) => {
            state.explainedLot = action.payload;
        },
        setCurrentLot: (state, action) => {
            state.currentLot = action.payload;
        },
        explainTheLot: (state, action) => {
            state.currentLot = action.payload;
            const splittedLot = (action.payload.split(""));
            const [ProductType, DF1, DF2, IntType, ChipsName1, ChipsName2, Serial1, Serial2] = splittedLot;
            const lotBreakdown = {
                ProductType,
                DenierFilament: DF1 + DF2,
                IntType,
                ChipsName: ChipsName1 + ChipsName2,
                Serial: Serial1 + Serial2,
            };

            const lotExplanation = {
                ProductType: PdWiseCode[parseInt(lotBreakdown.ProductType)],
                DenierFilament: findDFFromCode(lotBreakdown.DenierFilament),
                IntType: intTypeCode[parseInt(lotBreakdown.IntType)],
                ChipsName: findChipsFromCode(lotBreakdown.ChipsName),
                Serial: lotBreakdown.Serial,
            };
            console.log(lotExplanation);

            state.explainedLot = lotExplanation;
        }
    },
    extraReducers: (builder) => { }
});

export const { setExplainedLot, explainTheLot, setCurrentLot } = dtyLotNoExplSlice.actions;
export default dtyLotNoExplSlice.reducer;