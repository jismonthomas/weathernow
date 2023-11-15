export async function POST(request) {
    const body = await request.json();
    console.log('fetching weather data on server', body);

    const apiURL = process.env.NEXT_PUBLIC_WEATHER_API;

    const response = await fetch(
        `${apiURL}latitude=${body.latitude}&longitude=${body.longitude}`
    );

    const data = await response.json();

    return Response.json(data);
}
