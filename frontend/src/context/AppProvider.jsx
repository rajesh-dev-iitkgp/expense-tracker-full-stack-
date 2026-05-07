import ThemeProvider from "./ThemeContext";
import TransactionsProvider from "./TransactionsContext";

const AppProvider = ({children})=>{
    return (
        <ThemeProvider>
            <TransactionsProvider>
                 {children}
            </TransactionsProvider>
        </ThemeProvider>
    )
}

export default AppProvider