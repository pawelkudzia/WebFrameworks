namespace WebApi.Dtos
{
    public class QueryStringParameters
    {
        private int _page = 1;
        
        private int _limit = 10;

        public int Page
        {
            get => _page;
            set => _page = value < 1 ? 1 : value;
        }

        public int Limit
        {
            get => _limit;
            set => _limit = (value < 1) || (value > 1000) ? 10 : value;
        }
    }
}
