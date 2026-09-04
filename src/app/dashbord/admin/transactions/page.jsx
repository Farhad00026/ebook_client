import { PurchaseTable } from '@/components/Dashbord/admin/PurchaseTable';
import React from 'react';

const transactionspage = () => {
    return (
        <div>
            <h1 className="font-bold text-3xl text-center" >All Transaction records </h1>
            <PurchaseTable/>
        </div>
    );
};

export default transactionspage;