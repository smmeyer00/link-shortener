




export default function  CustomTooltip({ active, payload, label, isPieChart }) {

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-background p-2 border rounded-md" >
                <p className="label"><p className="inline font-bold">{`${isPieChart ? payload[0].name + ":" : ""}`}</p> <p className="inline">{`${payload[0].value}`}</p></p>
            </div>
        );
    }

    return null;
};