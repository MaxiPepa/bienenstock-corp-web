import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  invoiceContainer: {
    border: "1px solid black",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  dataContainer: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: "1px solid black",
    margin: 0,
  },
  sector1: {
    textAlign: "center",
    padding: 2,
    textTransform: "uppercase",
    fontSize: 12,
    height:"2.5%"
  },
  dataInvoice: {
    display: "flex",
    flexDirection: "row",
    height: 110,
    position: "relative",
  },
  image: {
    height: 70,
    width: 70,
    left: 45,
  },
  dataCompany: {
    borderRight: "1px solid black",
    width: "50%",
    paddingLeft: 45,
    paddingTop: 10,
  },
  dataCompanyInvoice: {
    width: "50%",
    paddingLeft: 45,
    paddingTop: 10,
  },

  typeInvoice: {
    position: "absolute",
    border: "1px solid black",
    borderTop: "none",
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 30,
    left: 235,
  },
  text: {
    fontSize: 10,
  },
  title: {
    fontSize: 20,
  },
  dataClient: {
    padding: 5,
    height:"7%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 3,
    paddingTop: 3,
  },
  code: {
    width: "20%",
    textAlign: "center"
  },
  description: {
    width: "30%",
    textAlign: "center"
  },
  quantity: {
    width: "10%",
    textAlign: "center"
  },
  unitPrice: {
    width: "20%",
    textAlign: "center"
  },
  subtotal: {
    width: "20%",
    textAlign: "center"
  },
  total: {
    borderBottom: "none",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    padding: 5,
    height:"auto",
    fontSize: 15,
    gap:20,
  },
});

export default styles;