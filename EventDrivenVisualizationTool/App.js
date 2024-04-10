import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { Upload, Button, Flex } from 'antd';


export default function App() {
  return (
    <div
        style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#9FCCE4",



        }}
    >
      <div id="heading"
        style= {{
            fontSize: "20px",
            height: "10%",
            textAlign: "center",



        }}
      >
        <h1>Event Driven Visualization Tool</h1>
      </div>
      <div id= "upload"
        style={{

            width: "80%",
            height: "60%",
            padding: "20px",

            textAlign: "center",
            marginTop: "20px",
            backgroundColor: "white",
            borderRadius: "20px",




        }}
      >
          <Upload.Dragger
            multiple
            action={"https://localhost:3000/"}
            accepts=".c,.cpp"
            beforeUpload={(file) => {
                console.log({ file });
                return false;
            }}

            >
            <p> Drag files here </p>
            <p> OR </p>
            
            <Button> Click Upload </Button>
          </Upload.Dragger>
      </div>
    </div>

  );
}

