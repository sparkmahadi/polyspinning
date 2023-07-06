import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    explainedLot: {},
};

const chipsCode = [
    "Direct",
    "CMFC",
    "Fuzian Jinlun",
    "Indorama",
    "Recron",
    "Hunvira",
    "PT.Sulindafin",
    "Xiaman Xianglu",
    "Eslon",
    "Chung Sing",
    "Tairilin",
    "Huvis",
    "Jade",
    "Gatronova",
    "Toplon",
    "Modern Syntex Ltd",
    "Nanlon",
    "Garden",
    "Zhejiang Hengyi",
    "Jiangsu",
    "Wankai",
    "Lealea",
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

const dtyLotNoExplSlice = createSlice({
    name: "dtyLotNoExplanation",
    initialState,
    reducers: {
        setExplainedLot: (state, action) => {
            state.explainedLot = action.payload;
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
                ChipsName: chipsCode[parseInt(lotBreakdown.ChipsName)],
                Serial: lotBreakdown.Serial,
            };
            console.log(lotExplanation);

            state.explainedLot = lotExplanation;
        }
    },
    extraReducers: (builder) => { }
});

export const { setExplainedLot, explainTheLot } = dtyLotNoExplSlice.actions;
export default dtyLotNoExplSlice.reducer;