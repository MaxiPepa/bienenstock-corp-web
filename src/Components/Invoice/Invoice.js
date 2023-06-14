import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import styles from "./Styles";

const Invoice = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.invoiceContainer}>
          <View style={[styles.dataContainer, styles.sector1]}>
            <Text>ORIGINAL</Text>
          </View>
          <View style={[styles.dataContainer, { height: "14%" }]}>
            <View style={styles.dataInvoice}>
              <View style={styles.dataCompany}>
                <Image src="./logo.jpg" style={styles.image} />
                <Text style={styles.title}>BienenStock Corp.</Text>
                <Text style={styles.text}>
                  Zeballos 1341 - Rosario - Argentina
                </Text>
              </View>
              <View style={styles.dataCompanyInvoice}>
                <Text style={styles.title}>FACTURA</Text>
                <Text style={styles.text}>N°: {data.saleId}</Text>
                <Text style={styles.text}>FECHA: {data.date}</Text>
                <Text> </Text>
                <Text style={styles.text}>CUIT: 30-55555555-9</Text>
                <Text style={styles.text}>INICIO ACTIVIDADES: 27/04/2023 </Text>
              </View>
            </View>
            <View style={styles.typeInvoice}>
              <Text>C</Text>
            </View>
          </View>
          <View style={[styles.dataContainer, styles.dataClient]}>
            <Text style={styles.text}>
              Nombre y Apellido: "Harcodeado con d"
            </Text>
            <Text style={styles.text}>DNI: Harcodeado por dos</Text>
            <Text style={styles.text}>
              Domicilio: Y esto tambien papa que te hace pensar que no lo iba a
              estar
            </Text>
          </View>
          <View style={[styles.dataContainer, { height: "73%" }]}>
            <View
              style={[
                styles.tableContainer,
                { fontSize: 12, backgroundColor: "black", color: "white" },
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
                style={[styles.tableContainer, { fontSize: 10 }]}
                key={index}
              >
                <Text style={styles.code}>{item.productCode}</Text>
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.unitPrice}>${(item.unitPrice).toFixed(2)}</Text>
                <Text style={styles.subtotal}>
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={[styles.dataContainer, styles.total]}>
            <Text>TOTAL</Text>
            <Text>${(data.totalPrice).toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
