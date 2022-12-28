import axios from 'axios';

export const api  = axios.create({
    baseURL: 'https://qkttvqfqcsssmhyilsox.supabase.co/rest/v1',
    headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdHR2cWZxY3Nzc21oeWlsc294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyNTAzMjYsImV4cCI6MTk4NzgyNjMyNn0.XscY2nplVUyQn2ukWZl2QLVfCSgSKOkPhwioWmKqSpI",
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdHR2cWZxY3Nzc21oeWlsc294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyNTAzMjYsImV4cCI6MTk4NzgyNjMyNn0.XscY2nplVUyQn2ukWZl2QLVfCSgSKOkPhwioWmKqSpI"
    }
})