import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLot: '',
    explainedLot: {},
};

const chipsCode = [
    {name: "Direct", Code: "0"},
    {name: "CMFC", Code: "1"},
    {name: "Fuzian Jinlun", Code: "2"},
    {name: "Indorama", Code: "3"},
    {name: "Recron", Code: "4"},
    {name: "Hunvira", Code: ""},
    {name: "PT.Sulindafin", Code: "5"},
    {name: "Xiaman Xianglu", Code: "6"},
    {name: "Eslon", Code: "7"},
    {name: "Chung Sing", Code: "8"},
    {name: "Tairilin", Code: "9"},
    {name: "Huvis", Code: "10"},
    {name: "Jade", Code: "11"},
    {name: "Gatronova", Code: ""},
    {name: "Toplon", Code: "12"},
    {name: "Modern Syntex Ltd", Code: "13"},
    {name: "Nanlon", Code: "14"},
    {name: "Garden", Code: "15"},
    {name: "Zhejiang Hengyi", Code: "16"},
    {name: "Jiangsu", Code: "17"},
    {name: "Wankai", Code: "18"},
    {name: "Lealea", Code: "19"},
];

const DFCode = [
    { DF: "50/36", Code: "02" },
    { DF: "70/36", Code: "07" },
    { DF: "75/36", Code: "08" },
    { DF: "75/72", Code: "13" },
    { DF: "100/36", Code: "20" },
    { DF: "100/96", Code: "25" },
    { DF: "146/48", Code: "31" },
    { DF: "150/48", Code: "32" },
    { DF: "150/96", Code: "36" },
    { DF: "150/144", Code: "41" },
    { DF: "150/108", Code: "59" },
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
    const foundDF = DFCode.find(item => item.Code === code);
    return foundDF ? foundDF.DF : "DF not found";
}

function findChipsFromCode(code) {
    const foundDF = chipsCode.find(item => item.Code === code);
    console.log(code);
    return foundDF ? foundDF.DF : "Chips not found";
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