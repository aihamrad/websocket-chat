const Messages = ({text, index}) => {
    const StringFix = (text, index) => {
        switch (text.split(":")[0]) {
          case "sent":
            return (
              <div key={index} className="d-flex justify-content-start">
                <div className="message-box message-sender">
                  {text.split("sent:")[1]}
                </div>
              </div>
            );
          case "received":
            return (
              <div key={index} className="d-flex justify-content-end">
                <div className="message-box message-reciver">
                  {text.split("received:")[1]}
                </div>
              </div>
            );
          default: <div />  
        }
        return text;
      };

    return (
        <div>
          {StringFix(text, index)}
        </div>
    )
}

export default Messages