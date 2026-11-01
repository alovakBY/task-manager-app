export const formatDateTime = (iso: string) => {
   const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   });

   return dateTimeFormatter.format(new Date(iso));
};
