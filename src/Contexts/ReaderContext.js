import { createContext, useState, useCallback } from "react";
import * as Reader from "Assets/Reader";

const ReaderContext = createContext();

const ReaderProvider = ({ children }) => {
  const [chatConnection, setChatConnection] = useState(null);
  const [pageConnection, setPageConnection] = useState(null);

  const startPageConnection = useCallback(
    (onUpdate, hubUrl, hubCode, actionCode) => {
      setPageConnection(Reader.listen(onUpdate, hubUrl, hubCode, actionCode));
    },
    []
  );

  const startChatConnection = useCallback((callback) => {
    setChatConnection(Reader.listen(callback, "chat", "chatHub", "ChatUpdate"));
  }, []);

  const stopPageConnection = useCallback(() => {
    Reader.stop(pageConnection);
  }, [pageConnection]);

  const stopChatConnection = useCallback(() => {
    Reader.stop(chatConnection);
  }, [chatConnection]);

  return (
    <ReaderContext.Provider
      value={{
        startPageConnection,
        startChatConnection,
        stopPageConnection,
        stopChatConnection,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};

export { ReaderProvider };
export default ReaderContext;
