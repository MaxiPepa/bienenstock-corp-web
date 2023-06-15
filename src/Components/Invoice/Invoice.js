import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import styles from "./Styles";
import { parsingDate } from "Assets/Parsing";

const Invoice = ({ data }) => {
  const bill = {
    billId: data.bill.billId.toString().padStart(8, "0"),
    saleDate: parsingDate(data.date),
    companyStartDate: parsingDate(data.bill.companyStart),
    companyIdentifier: data.bill.companyIdentifier,
    companyAddress: data.bill.companyAddress,
    billType: data.bill.billType,
    businessName: data.bill.businessName,
    consumerIdentifier: data.bill.consumerIdentifier,
    consumerAddress: data.bill.consumerAddress,
    paymentType: data.bill.paymentType,
    products: data.products,
    totalPrice: data.totalPrice
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.invoiceContainer}>
          <View style={styles.sectorInfoInvoice}>
            <View style={styles.relativeInfoInvoice}>
              <View style={styles.leftInfoInvoice}>
                <Image
                  src={process.env.PUBLIC_URL + "/invoiceLogo.png"}
                  style={styles.image}
                />
              </View>
              <View style={styles.rigthInfoInvoice}>
                <Text
                  style={[
                    styles.textInfoInvoice,
                    styles.title,
                    styles.textBold,
                  ]}
                >
                  FACTURA
                </Text>
                <Text> </Text>
                <View style={[styles.textInfoInvoice, styles.text]}>
                  <Text style={styles.textBold}>N°:</Text>
                  <Text>{bill.billId}</Text>
                </View>
                <View style={[styles.textInfoInvoice, styles.text]}>
                  <Text style={styles.textBold}>FECHA:</Text>
                  <Text>{bill.saleDate}</Text>
                </View>
                <Text> </Text>
                <View style={[styles.textInfoInvoice, styles.text]}>
                  <Text style={styles.textBold}>CUIT:</Text>
                  <Text>{bill.companyIdentifier}</Text>
                </View>
                <View style={[styles.textInfoInvoice, styles.text]}>
                  <Text style={styles.textBold}>INICIO ACTIVIDADES:</Text>
                  <Text>{bill.companyStartDate}</Text>
                </View>
                <Text> </Text>
                <Text> </Text>
                <Text style={{ fontSize: 10 }}>{bill.companyAddress}</Text>
              </View>
            </View>
            <View style={styles.absoluteInfoInvoice}>
              <Text>{bill.billType}</Text>
            </View>
          </View>
          <View style={styles.sectorDataClient}>
            <View style={styles.sectorLeftandRightDataClient}>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>Nombre y Apellido:</Text>
                <Text>{bill.businessName}</Text>
              </View>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>DNI:</Text>
                <Text>{bill.consumerIdentifier}</Text>
              </View>
            </View>
            <View style={styles.sectorLeftandRightDataClient}>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>Domicilio:</Text>
                <Text>{bill.consumerAddress}</Text>
              </View>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>Tipo pago: </Text>
                <Text>{bill.paymentType}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: "65vh", backgroundColor: "#efefef" }}>
            <View
              style={[
                styles.tableContainer,
                { fontSize: 12, backgroundColor: "#1f1f1f", color: "white" },
                styles.textBold,
              ]}
            >
              <Text style={styles.code}>CODIGO</Text>
              <Text style={styles.description}>DESCRIPCION</Text>
              <Text style={styles.quantity}>CANT.</Text>
              <Text style={styles.unitPrice}>PRECIO UNIT.</Text>
              <Text style={styles.subtotal}>SUBTOTAL</Text>
            </View>
            {bill.products.map((item, index) => (
              <View
                style={[styles.tableContainer, { fontSize: 11 }]}
                key={index}
              >
                <Text style={styles.code}>{item.productCode}</Text>
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.unitPrice}>
                  ${item.unitPrice.toFixed(2)}
                </Text>
                <Text style={styles.subtotal}>
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.total}>
            <Text style={styles.textBold}>TOTAL</Text>
            <Text>${bill.totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
