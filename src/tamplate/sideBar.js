const sidebar = () => {
    return (  
        
        <div className="container1"> 
        <div className="logo-container">
            <div className="logo"/>
        </div>
        <div className="buttons-container">
        <button className="sideb">
                 <div className="btic1"/>
                <div className="bttx">Home</div>
            </button>
            <br />
            <button className="sideb">
                 <div className="btic2"/>
                <div className="bttx">Teachers</div>
            </button>
            <br />
            <button className="sideb">
                 <div className="btic3"/>
                <div className="bttx">Schedules</div>
            </button>
            <br />
            <button className="sideb">
                 <div className="btic4"/>
                <div className="bttx">Structure</div>
            </button>
            <br />
            <button className="sideb">
                 <div className="btic5"/>
                <div className="bttx">Profile</div>
            </button>
            <br />
            <button className="sideb">
                 <div className="btic6"/>
                <div className="bttx">Settings</div>
            </button>
            <button className="sideabout">
                 <div className="btic7"/>
                <div className="bttx">about us</div>
            </button>
        </div>
        </div>
    );
}
 
export default sidebar;