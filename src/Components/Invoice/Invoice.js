import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import styles from "./Styles";

const Invoice = ({ data }) => {
  const divDateSale = data.date.split("T")[0].split("-");
  const showDateSale =
    divDateSale[2] + "/" + divDateSale[1] + "/" + divDateSale[0];
  const divDateCompanyStart = data.bill.companyStart.split("T")[0].split("-");
  const showDateCompanyStart =
    divDateCompanyStart[2] +
    "/" +
    divDateCompanyStart[1] +
    "/" +
    divDateCompanyStart[0];

  const showBillId = data.bill.billId.toString().padStart(8, "0");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.invoiceContainer}>
          <View style={styles.sectorInfoInvoice}>
            <View style={styles.relativeInfoInvoice}>
              <View style={styles.leftInfoInvoice}>
                <Image
                  src={process.env.PUBLIC_URL + "/LogoInvoice.png"}
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
                  <Text>{showBillId}</Text>
                </View>
                <View style={[styles.textInfoInvoice, styles.text]}>
                  <Text style={styles.textBold}>FECHA:</Text>
                  <Text>{showDateSale}</Text>
                </View>
                <Text> </Text>
                <View style={[styles.textInfoInvoice, styles.text]}>
                  <Text style={styles.textBold}>CUIT:</Text>
                  <Text>{data.bill.companyIdentifier}</Text>
                </View>
                <View style={[styles.textInfoInvoice, styles.text]}>
                  <Text style={styles.textBold}>INICIO ACTIVIDADES:</Text>
                  <Text>{showDateCompanyStart}</Text>
                </View>
                <Text> </Text>
                <Text> </Text>
                <Text style={{ fontSize: 10 }}>{data.bill.companyAddress}</Text>
              </View>
            </View>
            <View style={styles.absoluteInfoInvoice}>
              <Text>{data.bill.billType}</Text>
            </View>
          </View>
          <View style={styles.sectorDataClient}>
            <View style={styles.sectorLeftandRightDataClient}>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>Nombre y Apellido:</Text>
                <Text>{data.bill.businessName}</Text>
              </View>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>DNI:</Text>
                <Text>{data.bill.consumerIdentifier}</Text>
              </View>
            </View>
            <View style={styles.sectorLeftandRightDataClient}>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>Domicilio:</Text>
                <Text>{data.bill.consumerAddress}</Text>
              </View>
              <View style={[styles.textInfoInvoice, styles.text]}>
                <Text style={styles.textBold}>Tipo pago: </Text>
                <Text>{data.bill.paymentType}</Text>
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
            {data.products.map((item, index) => (
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
            <Text>${data.totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
