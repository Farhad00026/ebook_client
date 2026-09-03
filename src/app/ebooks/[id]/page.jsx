
const singlecarddetailpage = async({params}) => {
    const {id}= await params;
    return (
        <div>
            <h1>Detail page for {id} </h1>
        </div>
    );
};

export default singlecarddetailpage;