import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, Paper, Divider } from '@mui/material';
import { TransactionDetails, UserInfo, PaymentInfo, ReceiverInfo as ReceiverInfoType } from '../types';

interface ConfirmationPageProps {
  transaction: TransactionDetails;
  sender: UserInfo;
  payment: PaymentInfo;
  receiver: ReceiverInfoType;
}

const COLORS = {
  primary: '#13629F',
  hoverPrimary: '#0D4A7A',
  success: '#F3DB41',
  error: 'error.main',
  text: 'white',
  mutedText: 'rgba(255, 255, 255, 0.7)',
  divider: 'rgba(255, 255, 255, 0.2)',
  paperBackground: 'rgba(255, 255, 255, 0.1)',
};

const getPaymentMethodDisplay = (payment: PaymentInfo) => {
  if (!payment) return 'Not specified';

  switch (payment.paymentMethod) {
    case 'card':
      return `Credit Card ending in ${payment.details.cardNumber?.slice(-4)}`;
    case 'orange':
      return `Orange Money (${payment.details.phoneNumber})`;
    case 'mtn':
      return `MTN Mobile Money (${payment.details.phoneNumber})`;
    default:
      return 'Not specified';
  }
};

const ConfirmationPage = ({ transaction, sender, payment, receiver }: ConfirmationPageProps) => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [referenceNumber] = useState(() => Math.random().toString(36).substring(2, 15).toUpperCase());

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(Math.random() > 0.1 ? 'success' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!transaction || !sender || !payment || !receiver) {
    return (
      <Typography textAlign="center" color={COLORS.error}>
        Missing transaction details. Please try again.
      </Typography>
    );
  }

  if (status === 'processing') {
    return (
      <Box className="confirmation-container" textAlign="center" py={4}>
        <CircularProgress size={48} sx={{ color: COLORS.success }} />
        <Typography variant="h6" mt={2} sx={{ color: COLORS.text }}>
          Processing your transaction...
        </Typography>
        <Typography variant="body2" sx={{ color: COLORS.mutedText }} mt={1}>
          Please wait while we complete your transfer
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="confirmation-container">
      <Typography
        variant="h5"
        mb={3}
        textAlign="center"
        color={status === 'success' ? COLORS.success : COLORS.error}
      >
        {status === 'success' ? '✓ Transaction Successful!' : '× Transaction Failed'}
      </Typography>

      {status === 'success' && (
        <Paper elevation={2} sx={{ p: 3, bgcolor: COLORS.paperBackground, color: COLORS.text }}>
          <Typography variant="subtitle1" fontWeight="500" mb={2} sx={{ color: COLORS.text }}>
            Transaction Details
          </Typography>

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Amount Sent</Typography>
            <Typography variant="body1" sx={{ color: COLORS.text }}>
              {transaction.sendAmount} {transaction.sendCurrency}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Amount Received</Typography>
            <Typography variant="body1" sx={{ color: COLORS.text, fontWeight: 'bold', fontSize: '1.2rem' }}>
              {transaction.receiveAmount.toFixed(2)} {transaction.receiveCurrency}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Fees</Typography>
            <Typography variant="body1" sx={{ color: COLORS.text }}>
              {transaction.fees} {transaction.sendCurrency}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Exchange Rate</Typography>
            <Typography variant="body1" sx={{ color: COLORS.success }}>
              1 {transaction.sendCurrency} = {(transaction.receiveAmount / transaction.totalAmount).toFixed(4)}{' '}
              {transaction.receiveCurrency}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, borderColor: COLORS.divider }} />

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Reference Number</Typography>
            <Typography variant="body1" fontWeight="500" sx={{ color: COLORS.success }}>
              {referenceNumber}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Sender</Typography>
            <Typography variant="body1" sx={{ color: COLORS.text }}>
              {sender.name} ({sender.email})
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Payment Method</Typography>
            <Typography variant="body1" sx={{ color: COLORS.text }}>
              {getPaymentMethodDisplay(payment)}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" sx={{ color: COLORS.mutedText }}>Receiver</Typography>
            <Typography variant="body1" sx={{ color: COLORS.text }}>
              {receiver.name} ({receiver.email})
            </Typography>
          </Box>
        </Paper>
      )}

      {status === 'error' && (
        <Box textAlign="center" mt={2}>
          <Typography color={COLORS.error}>
            An error occurred while processing your transaction. Please try again.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: `${COLORS.primary} !important` }}
            onClick={() => setStatus('processing')}
          >
            Retry
          </Button>
        </Box>
      )}

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: `${COLORS.primary} !important`,
            '&:hover': {
              backgroundColor: `${COLORS.hoverPrimary} !important`,
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmationPage;