import { StyleSheet } from 'react-native';

export const VisualizationSelectionScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9FCCE4",
        padding: 10,
    },
    title: {
        fontSize: 48,
        textAlign: "center",
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Helvetica',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: "100%",
        padding: 20,
    },
    option: {
        width: '28%',
        aspectRatio: 1,
        margin: 10,
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOption: {
        borderColor: "blue",
        backgroundColor: "lemonchiffon",
    },
    image: {
        width: '75%',
        height: '70%',
        borderRadius: 10,
        resizeMode: 'contain',
    },
    optionText: {
        fontSize: 26,
        fontWeight: '600',
        color: '#333',
        textAlign: "center",
        fontFamily: 'Helvetica',
    },
    createButton: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        backgroundColor: "blue",
    },
    createButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
        textAlign: "center",
        fontFamily: 'Helvetica',
    },
});