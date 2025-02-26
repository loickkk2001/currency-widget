import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import ExchangeForm from '../steps/ExchangeForm';
import SenderKYC from '../steps/SenderKYC';
import PaymentMethod from '../steps/PaymentMethod';
import ReceiverInfo from '../steps/ReceiverInfo';
import ConfirmationPage from '../steps/ConfirmationPage';
import { UserInfo, ReceiverInfo as ReceiverInfoType, TransactionDetails, PaymentInfo } from '../types';
import AfpayLogo from '../assets/Afripayicon.jpg';
import DikaloLogo from '../assets/dikalo-logo.jpg';

const CurrencyWidget = ({ companyName = 'Dikalo' }: { companyName?: string }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [senderInfo, setSenderInfo] = useState<UserInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [receiverInfo, setReceiverInfo] = useState<ReceiverInfoType | null>(null);

  const steps = ['Exchange', 'Your Information', 'Payment Method', 'Receiver Information', 'Confirmation'];

  const handleExchangeSubmit = (details: TransactionDetails) => {
    setTransactionDetails(details);
    setActiveStep(1);
  };

  const handleSenderSubmit = (info: UserInfo) => {
    setSenderInfo(info);
    setActiveStep(2);
  };

  const handlePaymentSubmit = (info: PaymentInfo) => {
    setPaymentInfo(info);
    setActiveStep(3);
  };

  const handleReceiverSubmit = (info: ReceiverInfoType) => {
    setReceiverInfo(info);
    setActiveStep(4);
  };

  return (
    <Box className="widget-container" sx={{ bgcolor: 'black', color: 'white' }}>
      <Box className="widget-header">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
          <Box>
            <img src={DikaloLogo} alt="Dikalo Logo" height="40" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <img src={AfpayLogo} alt="Afpay Logo" height="30" />
            <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Powered by AfripayFinance ©
            </Typography>
          </Box>
        </Box>
      </Box>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '& .MuiStepLabel-label': { color: 'white' },
          '& .MuiStepIcon-root': { color: '#13629F' },
          '& .MuiStepIcon-root.Mui-active': { color: '#F3DB41' },
          '& .MuiStepIcon-root.Mui-completed': { color: '#F3DB41' },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box className="widget-content">
        {activeStep === 0 && <ExchangeForm onSubmit={handleExchangeSubmit} />}
        {activeStep === 1 && (
          <SenderKYC
            onSubmit={handleSenderSubmit}
            requireFullKYC={(transactionDetails?.sendAmount ?? 0) > 500}
          />
        )}
        {activeStep === 2 && <PaymentMethod onSubmit={handlePaymentSubmit} />}
        {activeStep === 3 && <ReceiverInfo onSubmit={handleReceiverSubmit} />}
        {activeStep === 4 && (
          <ConfirmationPage
            transaction={transactionDetails!}
            sender={senderInfo!}
            payment={paymentInfo!}
            receiver={receiverInfo!}
          />
        )}
      </Box>
    </Box>
  );
};

export default CurrencyWidget;