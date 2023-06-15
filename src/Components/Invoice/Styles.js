import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  invoiceContainer: {
    borderRadius: 20,
    fontFamily: "Helvetica",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
  },

  sectorInfoInvoice: {
    height: "16.5vh",
    backgroundColor: "#1f1f1f",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  relativeInfoInvoice: {
    display: "flex",
    flexDirection: "row",
    height: 110,
    position: "relative",
  },
  image: {
    height: "100vh",
    width: "23vw",
    transform: "scale(1.2)",
    top: 13,
    left: 45,
  },
  leftInfoInvoice: {
    width: "50vw",
  },
  rigthInfoInvoice: {
    width: "50vw",
    paddingLeft: 45,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    color: "white",
  },
  textInfoInvoice: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  absoluteInfoInvoice: {
    position: "absolute",
    borderRadius: 10,
    borderTop: "none",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Helvetica-Bold",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 30,
    left: 225,
  },
  text: {
    fontSize: 12,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  title: {
    fontSize: 20,
  },

  sectorDataClient: {
    padding: 5,
    height: "7vh",
    backgroundColor: "#efefef",
    display: "flex",
    flexDirection: "row",
  },
  sectorLeftandRightDataClient: {
    paddingTop: 5,
    width: "50vw",
    display: "flex",
    flexDirection: "colum",
    gap: 10,
  },

  tableContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 3,
    paddingTop: 3,
  },
  code: {
    width: "20%",
    textAlign: "center",
  },
  description: {
    width: "30%",
    textAlign: "center",
  },
  quantity: {
    width: "10%",
    textAlign: "center",
  },
  unitPrice: {
    width: "20%",
    textAlign: "center",
  },
  subtotal: {
    width: "20%",
    textAlign: "center",
  },
  total: {
    borderBottom: "none",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
    fontSize: 15,
    gap: 20,
    color: "white",
    backgroundColor: "#1f1f1f",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default styles;
